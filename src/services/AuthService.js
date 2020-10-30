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
  else {
    console.log("Token doesn't exist");
    return "";
  }
};

export const setEnv = (env) => {
  localStorage.setItem("env", env);
};

export const getEnv = () => {
  const env = localStorage.getItem("env");

  if (env) return env;
  else {
    console.log("Env doesn't exist");
    return "";
  }
};
