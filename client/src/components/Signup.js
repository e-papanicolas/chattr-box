import React from "react";
import { useState } from "react";

export default function Signup({ handleLogin, errors, setErrors }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleLogin(data);
      })
      .catch((e) => {
        console.log(e);
        setErrors(e);
      });
  };

  return (
    <div>
      Signup
      <form onSubmit={handleSubmitSignup}>
        <div>
          <label>
            Email:
            <input
              type="username"
              name="username"
              onChange={handleFormChange}
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              onChange={handleFormChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Sign Up" />
        </div>
      </form>
      {errors.map((err) => (
        <p>{err}</p>
      ))}
    </div>
  );
}
