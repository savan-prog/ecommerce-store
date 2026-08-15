import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";
import "../assets/css/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  //password strength
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 8) {
      setPasswordStrength("Weak");
    } else if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    //Empty field validation
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    //Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    //password lenght validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    //password and confirmPassword match validation
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });
      //  console.log(data);
      setMessage(data.message);

      //clear input's with the help of states
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      //register ke bad login ho jaye
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // console.log(error.response.data.message);
      // setError(error.response.data.message);
      setError(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <>
      <section className="auth-page">
        <div className="container">
          <div className="auth-wrapper">
            <h2 className="auth-title">Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
                {passwordStrength && (
                  <p
                    className={`password-strength ${passwordStrength.toLowerCase()}`}
                  >
                    {passwordStrength}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i
                    className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  ></i>
                </div>
              </div>
              <button type="submit" className="auth-btn">
                Register
              </button>
              {error && <p className="error-message">{error}</p>}
              {message && <p className="success-message">{message}</p>}
            </form>
            <p className="auth-text">
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
