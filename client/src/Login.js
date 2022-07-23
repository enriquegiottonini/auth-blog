import React from "react";
import { useState } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import { toast } from "react-toastify";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      props.setUser(user);
    } catch (exception) {
      toast("Invalid Username or Password.");
      console.error(exception);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin();

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            login
          </button>
        </label>
      </form>
    </div>
  );
};

export default Login;
