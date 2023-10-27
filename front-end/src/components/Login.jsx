import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const history = useNavigate ();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data); 
        history("/");
        console.log("Login réussi !");
      } else {
        console.error("Erreur de login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="login-container">
      <div class="login-container">
        <div class="login-row justify-content-center">
          <div class="login-col-md-6">
            <div class="login-card mt-5">
              <div class="login-card-body">
                <h1 class="login-card-title">Login</h1>
                <form onSubmit={handleSubmit}>
                  <div class="login-form-group">
                    <label for="login-email">Email</label>
                    <input
                      type="email"
                      class="login-form-control"
                      id="login-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="login-form-group">
                    <label for="login-password">Password</label>
                    <input
                      type="password"
                      class="login-form-control"
                      id="login-password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" class="login-button">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
