import axios from "axios";

export function createFeedbackSave(id) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:3001/api/feedbackSave",
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

export function deleteFeedbackSave(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        "http://localhost:3001/api/feedbackSave",
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
