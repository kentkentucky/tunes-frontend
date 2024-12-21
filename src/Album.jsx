import "./Album.css";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import back from "./icons/left-angle.png";
import Player from "./components/Player";
import { TokenContext, TrackContext, UserContext } from "./App";

function Album() {
  const tokenContext = useContext(TokenContext);
  const trackContext = useContext(TrackContext);
  const userContext = useContext(UserContext);

  const { albumID } = useParams();
  const [album, setAlbum] = useState(null);
  const accessToken = tokenContext.accessToken;
  const user = userContext.user;

  const navigate = useNavigate();

  useEffect(() => {
    getAlbum();
    trackContext.setCurrentTrack();
  }, [albumID]);

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

  const handleTrack = async (e, track, album) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/recent/add/album",
        {
          album,
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
                  <button
                    className="track-meta"
                    onClick={(e) => handleTrack(e, track, album)}
                  >
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
          <div className="player-container">
            <Player
              accessToken={accessToken}
              trackUri={trackContext.currentTrack?.uri}
            />
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
