// A mock function to mimic making an async request for data
export function fetchCount() {
  return new Promise((resolve) => {
    return fetch("http://localhost:3001/api/feedback")
      .then((response) => response.json())
      .then((data) => resolve(data));
  });
}
