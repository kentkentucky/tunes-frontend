import "./Player.css";

import { useState, useEffect, useContext } from "react";

import SpotifyWebPlayer from "react-spotify-web-playback";
import { TrackContext } from "../App";

function Player({ accessToken, trackUri }) {
  const trackContext = useContext(TrackContext);
  const [play, setPlay] = useState(false);

  if (!accessToken) return null;

  return (
    <div className="player-container">
      <SpotifyWebPlayer
        token={accessToken}
        showSaveIcon
        play={true}
        uris={trackUri ? [trackUri] : []}
        styles={{
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />
    </div>
  );
}

export default Player;
