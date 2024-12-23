import "./OnlinePlaylist.css";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import back from "./icons/left-angle.png";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import { TokenContext, TrackContext } from "./App";

function OnlinePlaylist() {
  const tokenContext = useContext(TokenContext);
  const trackContext = useContext(TrackContext);
  const accessToken = tokenContext.accessToken;

  const { playlistID } = useParams();
  const [playlist, setPlaylist] = useState(null);

  const navigate = useNavigate();

  useEffect(
    () => {
      getPlaylist();
      trackContext.setCurrentTrack();
    },
    [playlistID],
    []
  );

  const getPlaylist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/search/playlist",
        {
          params: { playlistID, accessToken },
        }
      );
      setPlaylist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleTrack = async (e, track, playlist) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/recent/add/playlist",
        {
          playlist,
          user,
        }
      );
      if (response) trackContext.setCurrentTrack(track);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {playlist && (
        <>
          <div className="playlist-container">
            <button className="back-btn" onClick={handleBack}>
              <img src={back} />
            </button>
            <img src={playlist.images[0].url} className="playlist-img" />
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <p>{playlist.owner.display_name}</p>
            <p>{playlist.followers.total} saves</p>
            <ul className="playlist-tracks">
              {playlist.tracks.items.map((track) => (
                <li key={track.track.id}>
                  <button
                    className="track-container"
                    onClick={(e) => handleTrack(e, track.track, playlist)}
                  >
                    <img
                      src={track.track.album.images[0].url}
                      className="track-img"
                    />
                    <div className="playlist-track-meta">
                      <p>{track.track.name}</p>
                      <div className="artist-name">
                        {track.track.artists.map((artist, index) => (
                          <span key={artist.id}>
                            {artist.name}
                            {index < track.track.artists.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Player
            accessToken={accessToken}
            trackUri={trackContext.currentTrack?.uri}
          />
          <Navbar />
          <footer>
            <a
              href="https://www.flaticon.com/free-icons/pixel"
              title="pixel icons"
            >
              Pixel icons created by Disha Vaghasiya - Flaticon
            </a>
          </footer>
        </>
      )}
    </>
  );
}

export default OnlinePlaylist;
