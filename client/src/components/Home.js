import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import UserContext from "../App";

function Home({ user, handleLogOut }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    chat_id: "629faa6288bdbf4be835d081",
    user_id: user._id,
  });

  const enterChat = () => {
    fetch(`http://localhost:7654/chat/new_user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/chatroom/${data.name}`);
      });
  };

  return (
    <div>
      <button onClick={handleLogOut}>Logout</button>
      <p>Hi, {user.username}</p>
      <button onClick={enterChat}>Enter Chat Room</button>
    </div>
  );
}

export default Home;
