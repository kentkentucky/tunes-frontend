import "./MetaBar.css";

import axios from "axios";
import Popup from "reactjs-popup";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import close from "../icons/close.png";
import { MetaContext } from "../Playlist";

function MetaBar() {
  const metaContext = useContext(MetaContext);
  const playlist = metaContext.playlist;

  const { playlistID } = useParams();

  const [url, setUrl] = useState(playlist.image);
  const [name, setName] = useState(playlist.name);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    metaContext.setMetaMode(false);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/playlist/meta", {
        url,
        name,
        playlistID,
      });
      if (response) {
        setMessage(response.data);
        setOpen(true);
        setTimeout(() => {
          metaContext.setMetaMode(false);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage(`${error.response.data}`);
      setOpen(true);
    }
  };

  return (
    <div className="metabar">
      <button className="close-btn" onClick={(e) => handleClose(e)}>
        <img src={close} className="close-icon" />
      </button>
      <h3>Edit Playlist Meta Data</h3>
      <form className="metadata-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="playlist-image-url">Playlist Image URL</label>
        <input
          id="playlist-image-url"
          type="url"
          value={url}
          onChange={handleUrl}
        ></input>

        <label htmlFor="playlist-name">Playlist Name</label>
        <input
          id="playlist-name"
          type="text"
          value={name}
          onChange={handleName}
        ></input>

        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
      <Popup open={open} onClose={() => setOpen(false)} modal>
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </Popup>
    </div>
  );
}

export default MetaBar;
