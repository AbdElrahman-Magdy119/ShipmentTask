import axios from "axios";
import apiConfigs from "src/config/api";
import { Notify } from "quasar";


let authKey = localStorage.getItem("token");


// all apis
export const axoisInstance = axios.create({
  baseURL: apiConfigs.baseURL,
  headers: {
    // Authorization: "Bearer " + authKey,
    // // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    // 'Accept': 'application/json'
  },
  
});

(axoisInstance).interceptors.request.use(
  async (req) => {
   
    authKey = localStorage.getItem("token");
    req.headers.Authorization = "Bearer " + authKey;
    return req;
  },
  (error) => Promise.reject(error)
);

(axoisInstance).interceptors.response.use(
  async (response) => {
    const unAuthorized = 401;
    if (response.data.StatusCode === unAuthorized) {
      localStorage.removeItem("token");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("email");
      localStorage.removeItem("_id");
    

      window.location.href = "/login";
      Notify.create({
        type: "negative",
        color: "negative",
        timeout: 1000,
        position: "bottom",
        message: response.data.Message,
      });
    }
    return response;
  },
  function (error) {
    if (error.response.StatusCode === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
(error) => Promise.reject(error);
