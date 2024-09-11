import React from "react";
import { Outlet } from "react-router-dom";


export default function AuthRoot() {
  const handleClick = () => {

  };

  return (
    <div className="auth-root-container">
      <h1>A U T H</h1>
      <button onClick={handleClick}>TOKEN</button>
      <Outlet />
    </div>
  );
}
