import { useState, useEffect } from "react";

import SpotifyWebPlayer from "react-spotify-web-playback";

function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (trackUri) {
      setPlay(true); // Automatically play when a new track is passed
    }
  }, [trackUri]);

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
