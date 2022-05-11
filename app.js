require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const logger = require("morgan");
const { Sequelize } = require("sequelize");
const { db, User } = require("./utils/database");

(async () => {
  const initDatabase = async () => {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      throw ("Unable to connect to the database:", error);
    }

    await db.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  };
  await initDatabase();
})();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const feedbackRouter = require("./routes/feedback");
const feedbackLikeRouter = require("./routes/feedbackLike");
const feedbackSaveRouter = require("./routes/feedbackSave");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
app.use(passport.authenticate("session"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));

var GoogleStrategy = require("passport-google-oidc");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:3001/oauth2/redirect/google",
    },
    async function (issuer, profile, cb) {
      console.log(issuer, profile);
      const [user, created] = await User.findOrCreate({
        where: {
          profileId: profile?.id,
          // issuer will be https://accounts.google.com
          profilePlatform: issuer,
        },
      });
      console.log(created ? "## User created" : "## User found");
      return cb(null, user);
    }
  )
);

app.use("/", indexRouter);
app.use("/", feedbackRouter);
app.use("/", feedbackLikeRouter);
app.use("/", feedbackSaveRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
