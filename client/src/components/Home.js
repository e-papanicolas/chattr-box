import React from "react";
import { useContext } from "react";
import UserContext from "../App";

function Home() {
  const user = useContext(UserContext);
  return (
    <div>
      Home
      <p>{user.username}</p>
    </div>
  );
}

export default Home;
