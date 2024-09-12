import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import "./index.css";
import Loader from "./component/structure/Loader";
import NotFound from "./component/structure/NotFound";
import Home from "./component/structure/Home";
import Header from "./component/structure/Header";
import Profile from "./component/structure/Profile";
// const RemoteStoreApp = React.lazy(() => import("store/StoreApp"));
// const RemoteOrderApp = React.lazy(() => import("order/OrderApp"));

export default function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/store/*" element={<RemoteStoreApp />} />
          <Route path="/order/*" element={<RemoteOrderApp />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
