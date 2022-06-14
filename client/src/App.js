import "./App.css";
// We use Route in order to define the different routes of our application
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";

export const UserContext = createContext({});

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // set state
  const [currentUser, setCurrentUser] = useState({});
  // TODO: display errors
  const [errors, setErrors] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [chat, setChat] = useState({});

  function setToken(token) {
    localStorage.setItem("token", token);
  }

  // handles login and logout, sets or removes user
  function handleLogin(user) {
    console.log(user);
    setCurrentUser(user);
    setLoggedIn(true);
    navigate(`/home`);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  // fetches the user from api and sets user in state
  useEffect(() => {
    fetch(`http://localhost:7654/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((e) => {
        console.error(e);
        setErrors(e);
      });
  }, [token]);

  if (!isLoggedIn) {
    return (
      <div>
        <Routes>
          <Route
            path="/signup"
            element={
              <Signup
                handleLogin={handleLogin}
                errors={errors}
                setErrors={setErrors}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/"
            element={
              <Login
                handleLogin={handleLogin}
                errors={errors}
                setErrors={setErrors}
                setToken={setToken}
              />
            }
          />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                user={currentUser}
                handleLogOut={handleLogOut}
                setChat={setChat}
                setErrors={setErrors}
              />
            }
          />
          <Route
            path="/chatroom/:name"
            element={
              <ChatRoom
                user={currentUser}
                chat={chat}
                setChat={setChat}
                setErrors={setErrors}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
