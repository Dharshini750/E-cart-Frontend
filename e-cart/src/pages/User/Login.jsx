import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import Sales from '../../assets/img/bg2.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInputs = () => {
    let isValid = true;

    if (email.trim() === '') {
      setError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setError("Provide a valid email address.");
      isValid = false;
    }

    if (password.trim() === '') {
      setError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    
    const logindata = {
      email: email,
      password: password,
    };
    try {
      const response = await loginUser(logindata);
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen overflow-auto flex justify-center items-center relative bg-opacity-50">
      <img src={Sales} alt="sales" className="w-full h-full object-cover absolute" />
      <div className="w-[35%] h-auto max-h-[90%] bg-white bg-opacity-50 rounded-lg p-8 flex flex-col justify-center items-center z-10 shadow-lg">
       
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title text-xl font-semibold mb-4">Login to your account</p>
          {error && <p className="error-message text-red-500">{error}</p>}

          <div className="input-container mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="input-container mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button type="submit" className="submit bg-[#0a0f0f] text-white p-2 rounded-md hover:bg-[#31958c] transition">
            Login
          </button>
          <p className="signup-link mt-4">
            No account?
            <Link to="/signup" className="text-[#0a0f0f]"> Sign up</Link>
          </p>
          <p className="signup-link mt-2">
            Admin User?
            <Link to="/adminlogin" className="text-[#0a0f0f]"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
