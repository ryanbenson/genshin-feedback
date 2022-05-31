import axios from "axios";

export function getFeedback() {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3001/api/feedback", { withCredentials: true })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export function createFeedback(content) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:3001/api/feedback",
        { content },
        { withCredentials: true }
      )
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export function updateFeedback(id, content, enabled) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://localhost:3001/api/feedback",
        {
          id,
          content,
          enabled,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
