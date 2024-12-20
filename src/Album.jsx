import "./Album.css";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import back from "./icons/left-angle.png";
import { TokenContext } from "./App";

function Album() {
  const tokenContext = useContext(TokenContext);

  const { albumID } = useParams();
  const [album, setAlbum] = useState(null);
  const accessToken = tokenContext.accessToken;

  const navigate = useNavigate();

  const getAlbum = async () => {
    try {
      const response = await axios.get("http://localhost:3000/search/album", {
        params: { albumID, accessToken },
      });
      setAlbum(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    getAlbum();
  }, [albumID]);

  return (
    <>
      {album && (
        <>
          <div className="album-container">
            <button className="back-btn" onClick={handleBack}>
              <img src={back} />
            </button>
            <img src={album.images[0].url} className="album-img" />
            <h2>{album.name}</h2>
            {album.artists.map((artist, index) => (
              <span key={artist.id}>
                {artist.name}
                {index < album.artists.length - 1 && ", "}
              </span>
            ))}
            <div className="album-details">
              <p>
                {album.type.charAt(0).toUpperCase() +
                  album.type.slice(1) +
                  " •"}
              </p>
              <p>{album.release_date.substring(0, 4)}</p>
            </div>
            <ul className="track-list">
              {album.tracks.items.map((track) => (
                <li key={track.id} className="track-container">
                  <button className="track-meta">
                    <p>{track.name}</p>
                    <div className="track-artist">
                      {track.artists.map((artist, index) => (
                        <span key={artist.id}>
                          {artist.name}
                          {index < track.artists.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
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

export default Album;
