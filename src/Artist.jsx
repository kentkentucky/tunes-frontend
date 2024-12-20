import "./Artist.css";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import back from "./icons/left-angle.png";
import { TokenContext } from "./App";

function Artist() {
  const tokenContext = useContext(TokenContext);
  const { artistID } = useParams();
  const [artist, setArtist] = useState(null);
  const accessToken = tokenContext.accessToken;

  const navigate = useNavigate();

  const getArtist = async () => {
    try {
      const response = await axios.get("http://localhost:3000/search/artist", {
        params: { artistID, accessToken },
      });
      setArtist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    getArtist();
  }, [artistID]);

  return (
    <>
      {artist && (
        <>
          <div className="artist-container">
            <button className="back-btn" onClick={handleBack}>
              <img src={back} />
            </button>
            <img src={artist.artist.images[0].url} className="artist-img" />
            <h2>{artist.artist.name}</h2>
            <p>{artist.artist.followers.total} followers</p>
            <div className="popular-container">
              <h3>Popular</h3>
              <ol className="top-tracks">
                {artist.tracks.tracks.map((track) => (
                  <li key={track.id}>
                    <button className="track-container">
                      <img
                        src={track.album.images[0].url}
                        className="track-img"
                      />
                      <p>{track.name}</p>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="releases-container">
              <h3>Albums</h3>
              <ul className="albums">
                {artist.albums.items.map((album) => (
                  <li key={album.id}>
                    <button className="album-btn">
                      <img
                        src={album.images[0].url}
                        className="album-btn-img"
                      />
                      <div className="album-btn-details">
                        <p>{album.name}</p>
                        <div className="album-btn-meta">
                          <p>{album.release_date.substring(0, 4) + " •"}</p>
                          <p>
                            {album.type.charAt(0).toUpperCase() +
                              album.type.slice(1)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
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

export default Artist;
