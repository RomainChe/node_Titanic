import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const history = useNavigate ();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirm: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        history("/login");
        console.log("Inscription réussie !");
      } else {
        console.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="register-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card mt-5">
              <div class="card-body">
                <h1 class="card-title">Register</h1>
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="register-username">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      id="register-username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="register-password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="register-password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="register-password-confirm">Confirm Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="register-password-confirm"
                      name="password_confirm"
                      value={formData.password_confirm}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="register-email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="register-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
