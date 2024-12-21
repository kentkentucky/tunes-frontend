import "./Home.css";

import { useContext, useEffect, useState } from "react";

import { UserContext, TokenContext, TrackContext } from "./App";

import Navbar from "./components/Navbar";
import Player from "./components/Player";
import axios from "axios";

function Home() {
  const userContext = useContext(UserContext);
  const trackContext = useContext(TrackContext);
  const tokenContext = useContext(TokenContext);
  const accessToken = tokenContext.accessToken;

  useEffect(() => {
    trackContext.setCurrentTrack();
  }, []);

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
        <Player
          accessToken={accessToken}
          trackUri={trackContext.currentTrack?.uri}
        />
      </div>
      <Navbar />
    </>
  );
}

export default Home;
