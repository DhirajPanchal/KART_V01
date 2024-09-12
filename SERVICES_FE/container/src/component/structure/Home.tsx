import React from "react";
import UserService from "../../service/UserService";

export default function Home() {
  return (
    <div>
      <h1>H O M E</h1>
      <h2>{UserService.getUsername()}</h2>

    </div>
  );
}
