import "./Home.css";

import { useContext, useEffect } from "react";
import axios from "axios";

import { UserContext } from "./App";
import Navbar from "./components/Navbar";

function Home() {
  const userContext = useContext(UserContext);

  return (
    <>
      <div className="home-container">
        <h1>Your Library</h1>
        <div className="playlists-container">
          <h2>Playlists</h2>
        </div>
        <div className="recents-container">
          <h2>Recents</h2>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default Home;
