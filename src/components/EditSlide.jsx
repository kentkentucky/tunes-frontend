import "./EditSlide.css";

import { useContext, useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";

import terminate from "../icons/close.png";
import subtract from "../icons/subtract.png";
import { EditContext } from "../Playlist";

function EditSlide() {
  const editContext = useContext(EditContext);
  const playlist = editContext.playlist;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    editContext.setEditMode(false);
  };

  const handleRemove = async (e, track) => {
    e.preventDefault();
    const trackID = track._id;
    try {
      const response = await axios.delete(
        "http://localhost:3000/playlist/remove",
        {
          params: { trackID },
        }
      );
      setMessage(response.data);
      setOpen(true);
    } catch (error) {
      console.error(error);
      setMessage(error.response.data);
      setOpen(true);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    editContext.setEditMode(false);
  };

  return (
    <div className="edit-slide">
      <div className="top-container">
        <button className="terminate-btn" onClick={(e) => handleClose(e)}>
          <img src={terminate} className="terminate-icon" />
        </button>
        <h3>Edit Playlist</h3>
      </div>
      <ul className="track-results">
        {playlist.tracks.map((track) => (
          <li key={track.id} className="track-row">
            <button onClick={(e) => handleRemove(e, track)}>
              <img src={track.album.images[0].url} />
              <div className="track-name">
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
              <div className="remove-track">
                <img src={subtract} className="subtract-icon" />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="bottom-container">
        <button className="save-btn" onClick={(e) => handleSave(e)}>
          Save
        </button>
      </div>
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
        <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons">
          Pixel icons created by menon - Flaticon
        </a>
      </footer>
    </div>
  );
}

export default EditSlide;
