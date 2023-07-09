import axios from "axios";
const api = axios.create({
  headers: {Accept: "application/json" },
  baseURL: import.meta.env.VITE_API_URL,
});

// const AUTH_TOKEN = ""
api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// api.interceptors.request.use(function (config) {
//   config.headers = {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
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
