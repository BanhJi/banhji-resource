import axios from "axios";
const api = axios.create({
  headers: {Accept: "application/json" },
  baseURL: import.meta.env.VITE_API_URL,
});

// const AUTH_TOKEN = ""
// axios.interceptors.request.use(function (config) {
//   config.headers = {
//     Authorization: `Bearer ${AUTH_TOKEN}`,
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }

//   return config
// }, function (error) {
//   return Promise.reject(error)
// })


api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 ) {
    }
    return Promise.reject(error);
  }
);

export { axios, api };
