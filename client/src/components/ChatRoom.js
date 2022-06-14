import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatRoom({ user, chat, setChat, setErrors }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    user: user._id,
    content: "",
  });

  // fetch to get chat
  useEffect(() => {
    fetch(`http://localhost:7654/chat/${chat._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChat(data);
      })
      .catch((e) => {
        console.error(e);
        setErrors(e);
      });
  }, [chat._id, token]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(chat._id);
    fetch(`http://localhost:7654/chat/${chat._id}/new_msg`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChat(data);
      })
      .catch((err) => {
        console.error(err);
        setErrors(err);
      });
  };

  const leaveChat = () => {
    fetch(`http://localhost:7654/chat/${chat._id}/leave`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/home`);
      })
      .catch((err) => {
        console.error(err);
        setErrors(err);
      });
  };

  return (
    <div>
      <h3>ChatRoom: {chat.name}</h3>
      <button onClick={leaveChat}>Leave</button>
      <div id="messages">
        {chat.messages?.map((message) => {
          return (
            <div key={message._id}>
              {message._id}: {message.content}
            </div>
          );
        })}
      </div>
      <div id="send-message">
        <form onSubmit={sendMessage}>
          <label>
            Send a message:
            <input type="text" name="content" onChange={handleFormChange} />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
