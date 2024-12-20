import "./Player.css";

import SpotifyWebPlayer from "react-spotify-web-playback";

function Player({ accessToken, trackUri }) {
  if (!accessToken) return null;
  return (
    <SpotifyWebPlayer
      token={accessToken}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
}

export default Player;
