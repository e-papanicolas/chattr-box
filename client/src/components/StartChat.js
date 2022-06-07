import React from "react";
import { useState } from "react";

export default function StartChat({ setPopup }) {
  const [formData, setFormData] = useState({});
  const handleFormChange = (e) => {};
  const renderChat = () => {
    console.log("Chat rendered");
  };

  // get all users, filter user out and return list in a select menu
  return (
    <div>
      <h3>StartChat</h3>
      <button onClick={() => setPopup(false)}>close</button>
      <form onSubmit={renderChat}>
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
      </form>
    </div>
  );
}
