import React from "react";
// import { useContext } from "react";
// import UserContext from "../App";

function Home({ user }) {
  // const user = useContext(UserContext);
  console.log(user);
  return (
    <div>
      Home
      <p>{user.username}</p>
    </div>
  );
}

export default Home;
