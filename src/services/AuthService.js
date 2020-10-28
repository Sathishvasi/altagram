/*
 *  Service related to token
 *
 */

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");

  if (token) return token;
  else return "";
};

export const setEnv = (env) => {
  localStorage.setItem("env", env);
};

export const getEnv = () => {
  const env = localStorage.getItem("env");

  if (env) return env;
  else return "";
};
