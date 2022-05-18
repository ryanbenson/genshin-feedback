import axios from "axios";
// A mock function to mimic making an async request for data
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
