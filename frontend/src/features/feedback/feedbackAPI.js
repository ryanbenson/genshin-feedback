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
