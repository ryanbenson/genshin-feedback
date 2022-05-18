import axios from "axios";

export function fetchCount() {
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
        { content: "hello" },
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
