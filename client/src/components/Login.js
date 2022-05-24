import React from "react";
import { useState } from "react";

export default function Login({ handleLogin, errors, setErrors, setToken }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmitLogin(e) {
    e.preventDefault();
    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleLogin(data.data);
        setToken(data.token);
      })
      .catch((e) => {
        console.log(e);
        setErrors(e);
      });
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmitLogin}>
        <div>
          <label>
            Username:
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
          <input type="submit" value="Log in" />
        </div>
      </form>
      {/* {errors?.map((err) => (
        <p>{err}</p>
      ))} */}
    </div>
  );
}
