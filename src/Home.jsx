import "./Home.css";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext, TokenContext, TrackContext } from "./App";

import Navbar from "./components/Navbar";
import Player from "./components/Player";
import axios from "axios";

function Home() {
  const userContext = useContext(UserContext);
  const trackContext = useContext(TrackContext);
  const tokenContext = useContext(TokenContext);
  const accessToken = tokenContext.accessToken;
  const user = userContext.user;

  const [recents, setRecents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRecents();
    trackContext.setCurrentTrack();
  }, []);

  const getRecents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/home/recent", {
        params: { user },
      });
      setRecents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrack = (e, track) => {
    e.preventDefault();
    trackContext.setCurrentTrack(track);
  };

  const handleAlbum = (e, album) => {
    e.preventDefault();
    navigate(`/album/${album.id}`);
  };

  const handlePlaylist = (e, playlist) => {
    e.preventDefault();
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <>
      <div className="home-container">
        <h1>Your Library</h1>
        <div className="recents-container">
          <h2>Recents</h2>
          <ul className="results-list">
            {recents.map((recent) => {
              if (recent.type === "album") {
                return (
                  <li key={recent.id} className="result-item">
                    <button onClick={(e) => handleAlbum(e, recent)}>
                      <img src={recent.images[0].url} />
                      <div className="result-details">
                        <p>{recent.name}</p>
                        <div className="result-meta">
                          <p>
                            {recent.type.charAt(0).toUpperCase() +
                              recent.type.slice(1) +
                              " •"}
                          </p>
                          {recent.artists.map((artist) => (
                            <p key={artist.id}>{artist.name}</p>
                          ))}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              } else if (recent.type === "track") {
                return (
                  <li key={recent.id} className="result-item">
                    <button onClick={(e) => handleTrack(e, recent)}>
                      <img src={recent.album.images[0].url} />
                      <div className="result-details">
                        <p>{recent.name}</p>
                        <div className="result-meta">
                          <p>
                            {recent.type.charAt(0).toUpperCase() +
                              recent.type.slice(1) +
                              " •"}
                          </p>
                          {recent.artists.map((artist, index) => (
                            <span key={artist.id}>
                              {artist.name}
                              {index < recent.artists.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              } else if (recent.type === "playlist") {
                return (
                  <li key={recent.id} className="result-item">
                    <button onClick={(e) => handlePlaylist(e, recent)}>
                      <img src={recent.images[0].url} />
                      <div className="result-details">
                        <p>{recent.name}</p>
                        <div className="result-meta">
                          <p>
                            {recent.type.charAt(0).toUpperCase() +
                              recent.type.slice(1)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
        <div className="playlists-container">
          <h2>Playlists</h2>
        </div>
      </div>
      <div className="player-with-navbar">
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
