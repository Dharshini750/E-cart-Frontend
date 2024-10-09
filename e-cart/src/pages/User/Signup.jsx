import React, { useState } from "react";
import Logox from "../../assets/img/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api"; // Import the register function

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, email, phone, password };
      const response = await registerUser(userData); // Destructure response data
      console.log(response.data);
      if (response.status === 201) {
        localStorage.setItem("token", response.data?.token);
        navigate("/home"); // Redirect to home page on successful signup
      } else if (response.status === 422) {
        alert("email already exists !");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="w-full h-[100vh] fnt flex justify-center items-center primary">
      <div className="w-[40%] h-[90%] flex flex-col justify-center items-center pl-20">
        <img src={Logox} alt="logo" className="w-auto h-[10%] rounded-full" />
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Sign up to create an account</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit">
            Sign up
          </button>
          <p className="signup-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;