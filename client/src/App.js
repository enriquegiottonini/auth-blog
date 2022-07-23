import React from "react";
import "./styles/App.css";
import Login from "./Login";
import loginService from "./services/login";

import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  const loginForm = () =>
    user ? (
      <div>
        <p>user:</p>
        <p>username: {user.username}</p>
        <p>token: {user.token}</p>
      </div>
    ) : (
      <Login user={user} setUser={setUser} />
    );

  return (
    <div>
      <h1 className="heading__one">React application!!</h1>
      {loginForm()}
    </div>
  );
};

export default App;
