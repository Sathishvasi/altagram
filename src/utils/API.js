/*
 *  Contains all the API related functions
 *
 */

import axios from "axios";
import { getToken } from "services/TokenService";

//create an axios instance for the whole application
const instance = axios.create({
  baseURL: "http://167.99.139.119:8080/",
  responseType: "json",
  timeout: 60000,
});

//use axios interceptor to attach bearer token with every request
instance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//use axios interceptor to handle api errors
// instance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response) {
//       if (error.response.status === 401) {
//         //access token expired
//         //call refresh api
//         refreshAccessToken();
//       } else if (error.response.status === 403) {
//         //refresh token expired
//         clearToken();
//         history.push("/login");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default instance;
