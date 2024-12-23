import "./Playlist.css";

import { useEffect, useState, useContext, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { TokenContext, TrackContext, UserContext } from "./App";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import EditSlide from "./components/EditSlide";
import MetaBar from "./components/MetaBar";
import back from "./icons/left-angle.png";
import add from "./icons/music-note.png";
import edit from "./icons/edit-button.png";
import play from "./icons/play.png";
import bin from "./icons/trash-bin.png";

export const AddContext = createContext();
export const EditContext = createContext();
export const MetaContext = createContext();

function Playlist() {
  const tokenContext = useContext(TokenContext);
  const trackContext = useContext(TrackContext);
  const userContext = useContext(UserContext);
  const accessToken = tokenContext.accessToken;
  const username = userContext.user.username;

  const { playlistID } = useParams();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [metaMode, setMetaMode] = useState(false);

  useEffect(() => {
    getPlaylist();
  }, [addMode, editMode, metaMode]);

  const getPlaylist = async () => {
    try {
      const response = await axios.get("http://localhost:3000/playlist", {
        params: { playlistID },
      });
      setPlaylist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddMode(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleMeta = (e) => {
    e.preventDefault();
    setMetaMode(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        "http://localhost:3000/playlist/delete",
        {
          params: { playlistID },
        }
      );
      if (response) navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="playlist">
      <AddContext.Provider value={{ setAddMode: setAddMode }}>
        {addMode && <SearchBar />}
      </AddContext.Provider>
      <EditContext.Provider
        value={{ setEditMode: setEditMode, playlist: playlist }}
      >
        {editMode && <EditSlide />}
      </EditContext.Provider>
      <MetaContext.Provider
        value={{ setMetaMode: setMetaMode, playlist: playlist }}
      >
        {metaMode && <MetaBar />}
      </MetaContext.Provider>
      <button className="back-btn" onClick={handleBack}>
        <img src={back} />
      </button>
      <button className="bin-btn" onClick={handleDelete}>
        <img src={bin} className="bin-icon" />
      </button>
      <div className="collection">
        <img src={playlist.image} className="collection-img" />
        <div className="playlist-banner">
          <h3>{playlist.name}</h3>
          <button onClick={(e) => handleMeta(e)}>
            <img src={edit} />
          </button>
        </div>
        <p>{username}</p>
        <div className="action-bar">
          <button onClick={(e) => handleAdd(e)}>
            <img src={add} />
          </button>
          <button onClick={(e) => handleEdit(e)}>
            <img src={edit} />
          </button>
          <button>
            <img src={play} />
          </button>
        </div>
        {playlist.tracks && playlist.tracks.length > 0 ? (
          <ul className="playlist-tracks">
            {playlist.tracks.map((track) => (
              <li key={track.id}>
                <button className="track-container">
                  <img src={track.album.images[0].url} className="track-img" />
                  <div className="playlist-track-meta">
                    <p>{track.name}</p>
                    <div className="artist-name">
                      {track.artists.map((artist, index) => (
                        <span key={artist.id}>
                          {artist.name}
                          {index < track.artists.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p id="empty-playlist">
            Your playlist is currently empty.<br></br>
            Start adding tracks to bring it to life!
          </p>
        )}
      </div>
      <Player
        accessToken={accessToken}
        trackUri={trackContext.currentTrack?.uri}
      />
      <Navbar />
      <footer>
        <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons">
          Pixel icons created by frelayasia - Flaticon
        </a>
        <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons">
          Pixel icons created by Disha Vaghasiya - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/add-music"
          title="add music icons"
        >
          Add music icons created by mnauliady - Flaticon
        </a>
        <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons">
          Pixel icons created by frelayasia - Flaticon
        </a>
      </footer>
    </div>
  );
}

export default Playlist;
