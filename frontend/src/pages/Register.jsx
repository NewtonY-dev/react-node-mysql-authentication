import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        values
      );
      if (response.status === 201) {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Indicators for the top red dot */}
        <div className="register-indicators">
          <span className="indicator-dot red"></span>
          <span className="indicator-dot light"></span>
        </div>

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleChanges}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChanges}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChanges}
            />
          </div>

          <button className="submit-button">Submit</button>
        </form>

        <div className="login-link-container">
          <p>
            Already have account?{" "}
            <Link to="/login" className="login-button">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
