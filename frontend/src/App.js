import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import {
  fetchAsync,
  postAsync,
  selectList,
} from "./features/feedback/feedbackSlice";
import {
  postFeedbackLikeAsync,
  deleteFeedbackLikeAsync,
} from "./features/feedbackLike/feedbackLikeSlice";

function App() {
  const dispatch = useDispatch();

  const data = useSelector(selectList);
  useEffect(() => {
    dispatch(fetchAsync());
    console.log(data);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button onClick={() => dispatch(postAsync("hello mate"))}>
            Add New
          </button>
          <button onClick={() => dispatch(postFeedbackLikeAsync(1))}>
            Like
          </button>
          <button onClick={() => dispatch(deleteFeedbackLikeAsync(1))}>
            Remove Like
          </button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
