import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css"

const Login = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      toast.success("Login successful!");
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      navigate("/");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="container-fluid login-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="checkout-method">
         <h5>Welcome To Flikzo Admin</h5>
        </div>

        <div className="checkout-information">
          <div className="input-group">
            <label htmlFor="username">Username</label>

            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </div>

        </div>

        <button type="submit" className="button button--checkout">Login</button>
      </form>
    </div>
  );
};

export default Login;
