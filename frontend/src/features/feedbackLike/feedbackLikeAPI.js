import axios from "axios";

export function createFeedbackLike(id) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:3001/api/feedbackLike",
        { id },
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

export function deleteFeedbackLike(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        "http://localhost:3001/api/feedbackLike",
        {
          id,
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
