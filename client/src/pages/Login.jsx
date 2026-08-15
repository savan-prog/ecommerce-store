import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../assets/css/auth.css";
import { loginUser } from "../services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    //empty field validation
    if (!email.trim() || !password) {
      setError("Please fill all fields");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const data = await loginUser({
        email,
        password,
      });
      // console.log(data);
      setMessage(data.message);
      //token, userName and role save into localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("role", data.user.role);

      //form clear
      setEmail("");
      setPassword("");

      //redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    }
  };
  return (
    <>
      <section className="auth-page">
        <div className="container">
          <div className="auth-wrapper">
            <h2 className="auth-title">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>
              <button type="submit" className="auth-btn">
                Login
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <p className="auth-text">
              Don't have an account?
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
