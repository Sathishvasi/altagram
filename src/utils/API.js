/*
 *  Contains all the API related functions
 *
 */

import axios from "axios";
import { getToken } from "services/AuthService";

//create an axios instance for the whole application
const instance = axios.create({
  baseURL: "http://167.99.139.119:8080/",
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

export default instance;
