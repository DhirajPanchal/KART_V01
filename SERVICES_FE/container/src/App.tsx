import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import "./index.css";
import Loader from "./component/structure/Loader";
import NotFound from "./component/structure/NotFound";
import Home from "./component/structure/Home";
import Header from "./component/structure/Header";
import Profile from "./component/structure/Profile";
import UserService from "./service/UserService";
const StoreRemoteApp = React.lazy(() => import("store/StoreApp"));
const InventoryRemoteApp = React.lazy(() => import("inventory/InventoryApp"));


export default function App() {

  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store/*" element={<StoreRemoteApp />} />
          <Route path="/inventory/*" element={<InventoryRemoteApp />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
