import { useState, useEffect, useContext } from "react";

import SpotifyWebPlayer from "react-spotify-web-playback";
import { TrackContext } from "../App";

function Player({ accessToken, trackUri }) {
  const trackContext = useContext(TrackContext);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (trackContext.currentTrack) {
      setPlay(true);
    }
  }, [trackContext.currentTrack]);

  if (!accessToken) return null;

  return (
    <SpotifyWebPlayer
      token={accessToken}
      showSaveIcon
      play={true}
      uris={trackUri ? [trackUri] : []}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      styles={{
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
      }}
    />
  );
}

export default Player;
