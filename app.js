require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:3001/oauth2/redirect/google",
    },
    function (issuer, profile, cb) {
      console.log(issuer, profile);
      return cb(null, { issuer, profile });
      // db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      //   issuer,
      //   profile.id
      // ], function(err, cred) {
      //   if (err) { return cb(err); }
      //   if (!cred) {
      //     // The Google account has not logged in to this app before.  Create a
      //     // new user record and link it to the Google account.
      //     db.run('INSERT INTO users (name) VALUES (?)', [
      //       profile.displayName
      //     ], function(err) {
      //       if (err) { return cb(err); }

      //       var id = this.lastID;
      //       db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
      //         id,
      //         issuer,
      //         profile.id
      //       ], function(err) {
      //         if (err) { return cb(err); }
      //         var user = {
      //           id: id.toString(),
      //           name: profile.displayName
      //         };
      //         return cb(null, user);
      //       });
      //     });
      //   } else {
      //     // The Google account has previously logged in to the app.  Get the
      //     // user record linked to the Google account and log the user in.
      //     db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
      //       if (err) { return cb(err); }
      //       if (!user) { return cb(null, false); }
      //       return cb(null, user);
      //     });
      //   }
      // };
    }
  )
);

app.use("/", indexRouter);
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
