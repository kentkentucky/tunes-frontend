import "./Home.css";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext, TokenContext, TrackContext } from "./App";

import Navbar from "./components/Navbar";
import Player from "./components/Player";
import add from "./icons/add.png";

function Home() {
  const userContext = useContext(UserContext);
  const trackContext = useContext(TrackContext);
  const tokenContext = useContext(TokenContext);
  const accessToken = tokenContext.accessToken;
  const user = userContext.user;

  const [recents, setRecents] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRecents();
    getPlaylists();
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

  const getPlaylists = async () => {
    try {
      const response = await axios.get("http://localhost:3000/home/playlist", {
        params: { user },
      });
      setPlaylists(response.data);
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

  const handleOnlinePlaylist = (e, playlist) => {
    e.preventDefault();
    navigate(`/onlineplaylist/${playlist.id}`);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/playlist/create");
  };

  const handlePlaylist = (e, playlistID) => {
    e.preventDefault();
    navigate(`/playlist/${playlistID}`);
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
                    <button onClick={(e) => handleOnlinePlaylist(e, recent)}>
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
          <div className="playlist-header">
            <h2>Playlists</h2>
            <button className="add-btn" onClick={handleAdd}>
              <img src={add} className="add-icon" />
            </button>
          </div>
          <ul className="playlist-list">
            {playlists.map((playlist) => (
              <li key={playlist._id} className="result-item">
                <button onClick={(e) => handlePlaylist(e, playlist._id)}>
                  <img src={playlist.image} />
                  <p className="playlist-name">{playlist.name}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Player
        accessToken={accessToken}
        trackUri={trackContext.currentTrack?.uri}
      />
      <Navbar />
      <footer>
        <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons">
          Pixel icons created by menon - Flaticon
        </a>
      </footer>
    </>
  );
}

export default Home;
