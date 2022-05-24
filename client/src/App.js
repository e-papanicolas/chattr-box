import "./App.css";
// We use Route in order to define the different routes of our application
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

export const UserContext = createContext({});

function App() {
  const navigate = useNavigate();

  // set state
  const [currentUser, setCurrentUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  // handles login and logout, sets or removes user
  function handleLogin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
    navigate(`/home`);
  }

  function handleLogOut() {
    fetch(`/users/${currentUser.id}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoggedIn(false);
    navigate("/");
  }

  // fetches the user from api and sets user in state
  useEffect(() => {
    fetch(`/users/${currentUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((e) => {
        console.log(e);
        setErrors(e);
      });
  }, [currentUser.id]);

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
          <Route path="/home" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
