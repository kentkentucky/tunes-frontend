import "./Home.css";

import { useContext, useEffect, useState } from "react";

import { UserContext } from "./App";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import axios from "axios";

function Home() {
  const userContext = useContext(UserContext);
  let code = new URLSearchParams(window.location.search).get("code");
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || "";
  });

  const requestAccessToken = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/token", {
        code,
      });
      const token = response.data;
      setAccessToken(token);
      localStorage.setItem("accessToken", token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestAccessToken();
  }, [code]);

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
      <div>
        <Player accessToken={accessToken} />
      </div>
      <Navbar />
    </>
  );
}

export default Home;
