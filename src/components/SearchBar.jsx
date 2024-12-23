import "./SearchBar.css";

import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";

import close from "../icons/close.png";
import add from "../icons/add-to-playlist.png";
import { AddContext } from "../Playlist";
import { TokenContext } from "../App";

function SearchBar() {
  const addContext = useContext(AddContext);
  const tokenContext = useContext(TokenContext);
  const accessToken = tokenContext.accessToken;

  const { playlistID } = useParams();

  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    addContext.setAddMode(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/search",
        {
          params: { search, accessToken },
        }
      );
      setTracks(response.data.tracks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (e, track) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/playlist/add", {
        track,
        playlistID,
      });
      if (response) {
        setMessage(response.data);
        setOpen(true);
        setTimeout(() => {
          addContext.setAddMode(false);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage(`${error.response.data}`);
      setOpen(true);
    }
  };

  return (
    <div className="searchbar">
      <button className="close-btn" onClick={(e) => handleClose(e)}>
        <img src={close} className="close-icon" />
      </button>
      <form className="input-bar" onSubmit={handleSubmit}>
        <h3>Add to playlist</h3>
        <input
          type="text"
          placeholder=" 🔍 Search"
          onChange={handleSearch}
        ></input>
      </form>
      <ul className="track-results">
        {tracks.map((track) => (
          <li key={track.id} className="track-row">
            <button onClick={(e) => handleAdd(e, track)}>
              <img src={track.album.images[0].url} />
              <div className="track-name">
                <p>{track.name}</p>
                <div className="type-artist">
                  <p>
                    {track.type.charAt(0).toUpperCase() +
                      track.type.slice(1) +
                      " •"}
                  </p>
                  {track.artists.map((artist, index) => (
                    <span key={artist.id}>
                      {artist.name}
                      {index < track.artists.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="add-track">
                <img src={add} className="addtrack-icon" />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Popup open={open} onClose={() => setOpen(false)} modal>
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </Popup>
      <footer>
        <a href="https://www.flaticon.com/free-icons/close" title="close icons">
          Close icons created by ariefstudio - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/soundtrack"
          title="soundtrack icons"
        >
          Soundtrack icons created by Smashicons - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/add-to-playlist"
          title="add to playlist icons"
        >
          Add to playlist icons created by afif fudin - Flaticon
        </a>
      </footer>
    </div>
  );
}

export default SearchBar;
