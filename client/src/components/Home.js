import React from "react";
// import { useContext } from "react";
// import UserContext from "../App";

function Home({ user, handleLogOut }) {
  // const user = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <button onClick={handleLogOut}>Logout</button>
      Home
      <p>{user.username}</p>
    </div>
  );
}

export default Home;
