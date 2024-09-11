import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>
);
// ReactDOM.createRoot(document.getElementById("app")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
