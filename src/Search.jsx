import "./Search.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/search", {
        params: { search },
      });
      setResult(true);
      setAlbums(response.data.albums);
      setArtists(response.data.artists);
      setPlaylists(response.data.playlists);
      setTracks(response.data.tracks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTrack = async (e, trackID) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/search/track", {
        params: { trackID },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlbum = (e, albumID) => {
    e.preventDefault();
    navigate(`/album/${albumID}`);
  };

  const handleArtist = (e, artistID) => {
    e.preventDefault();
    navigate(`/artist/${artistID}`);
  };

  const handlePlaylist = (e, playlistID) => {
    e.preventDefault();
    navigate(`/playlist/${playlistID}`);
  };

  return (
    <>
      <form className="search-input" onSubmit={handleSubmit}>
        <input type="text" onChange={handleSearch}></input>
        <Link to="/home">Cancel</Link>
      </form>
      {!result && (
        <div className="recent-search">
          <h2>Recent Searches</h2>
        </div>
      )}
      {result && (
        <div className="search-results">
          <h2>Results</h2>
          <ul className="results-list">
            {albums.map((album) => (
              <li key={album.id} className="result-item">
                <button onClick={(e) => handleAlbum(e, album.id)}>
                  <img src={album.images[0].url} />
                  <div className="result-details">
                    <p>{album.name}</p>
                    <div className="result-meta">
                      <p>
                        {album.type.charAt(0).toUpperCase() +
                          album.type.slice(1) +
                          " •"}
                      </p>
                      {album.artists.map((artist) => (
                        <p key={artist.id}>{artist.name}</p>
                      ))}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <ul className="results-list">
            {artists.map((artist) => (
              <li key={artist.id} className="result-item">
                <button onClick={(e) => handleArtist(e, artist.id)}>
                  <img src={artist.images[0].url} />
                  <div className="result-details">
                    <p>{artist.name}</p>
                    <div className="result-meta">
                      <p>
                        {artist.type.charAt(0).toUpperCase() +
                          artist.type.slice(1)}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <ul className="results-list">
            {playlists.filter(Boolean).map((playlist) => (
              <li key={playlist.id} className="result-item">
                <button onClick={(e) => handlePlaylist(e, playlist.id)}>
                  <img src={playlist.images[0].url} />
                  <div className="result-details">
                    <p>{playlist.name}</p>
                    <div className="result-meta">
                      <p>
                        {playlist.type.charAt(0).toUpperCase() +
                          playlist.type.slice(1)}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <ul className="results-list">
            {tracks.map((track) => (
              <li key={track.id} className="result-item">
                <button onClick={(e) => handleTrack(e, track.id)}>
                  <img src={track.album.images[0].url} />
                  <div className="result-details">
                    <p>{track.name}</p>
                    <div className="result-meta">
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
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Search;
