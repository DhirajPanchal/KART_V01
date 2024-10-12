import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserService from "./service/UserService";

// import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

// interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
//   headers: AxiosRequestHeaders
// }

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:8403"
// });

// // Interceptors
// axiosInstance.interceptors.request.use(
//   (config): AdaptAxiosRequestConfig => {
//     return config;
//   },
//   (error): any => {
//     return Promise.reject(error);
//   }
// );

// const renderApp = () =>
//   ReactDOM.createRoot(document.getElementById("app")!).render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   );

// UserService.initKeycloak(renderApp);

const renderApp = () =>
  ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

UserService.initKeycloak(renderApp);
