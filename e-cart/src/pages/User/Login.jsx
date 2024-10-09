import React, { useState } from "react";
import axios from "axios";
import Logox from "../../assets/img/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    console.log("response.data");
    const logindata = {
      email: email,
      password: password,
    };
    try {
      const response = await loginUser(logindata);
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data?.token);
        navigate("/home");
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full h-[100vh] fnt flex justify-center items-center primary">
      <div className="w-[40%] h-[90%] flex flex-col justify-center items-center pl-20">
        <img src={Logox} alt="logo" className="w-auto h-[10%] rounded-full" />
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Login to your account</p>
          {error && <p className="error-message">{error}</p>}{" "}
        
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="submit">
            Login
          </button>
          <p className="signup-link">
            No account?
            <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;