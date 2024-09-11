import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Route, Routes, Navigate, json } from "react-router-dom";
import "./index.css";
import Loader from "./component/structure/Loader";
import NotFound from "./component/structure/NotFound";
import Home from "./component/structure/Home";
import Header from "./component/structure/Header";
import AuthRoot from "./component/auth/AuthRoot";
import LoginProgress from "./component/auth/LoginProgress";
import LoginComplete from "./component/auth/LoginComplete";
import LogoutProgress from "./component/auth/LogoutProgress";
import LogoutComplete from "./component/auth/LogoutComplete";
const RemoteStoreApp = React.lazy(() => import("store/StoreApp"));
const RemoteOrderApp = React.lazy(() => import("order/OrderApp"));

export default function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthRoot />}>
            <Route path="login-progress" element={<LoginProgress />} />
            <Route path="login-complete" element={<LoginComplete />} />
            <Route path="logout-progress" element={<LogoutProgress />} />
            <Route path="logout-complete" element={<LogoutComplete />} />
          </Route>
          <Route path="/store/*" element={<RemoteStoreApp />} />
          <Route path="/order/*" element={<RemoteOrderApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
