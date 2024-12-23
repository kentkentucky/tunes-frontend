import "./AddPlaylist.css";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import Popup from "reactjs-popup";

import cancel from "./icons/wrong.png";
import { UserContext } from "./App";

function AddPlaylist() {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  const [playlistName, setPlaylistName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/playlist/create",
        {
          playlistName,
          user,
        }
      );
      if (response) {
        setMessage(`Successfully created ${playlistName}`);
        setOpen(true);
        setTimeout(() => {
          navigate(`/playlist/${response.data}`);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage(`${error.response.data}`);
      setOpen(true);
    }
  };

  const handlePlaylistName = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <button className="cancel-btn" onClick={handleCancel}>
        <img src={cancel} className="cancel-icon" />
      </button>
      <form className="create-form" onSubmit={handleCreate}>
        <p>Give your playlist a name.</p>
        <input
          type="text"
          defaultValue="Timeless Tunes"
          onChange={handlePlaylistName}
        ></input>
        <button className="create-btn">Create</button>
      </form>
      <Popup open={open} onClose={() => setOpen(false)} modal>
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </Popup>
      <footer>
        <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons">
          Pixel icons created by menon - Flaticon
        </a>
      </footer>
    </>
  );
}

export default AddPlaylist;
