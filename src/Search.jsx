import "./Search.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { TokenContext, UserContext } from "./App";
import Player from "./components/Player";

function Search() {
  const tokenContext = useContext(TokenContext);
  const userContext = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState([]);
  const [recentSearch, setRecentSearch] = useState([]);
  const user = userContext.user;
  const accessToken = tokenContext.accessToken;

  const navigate = useNavigate();

  useEffect(() => {
    getSearches();
  }, []);

  const getSearches = async () => {
    try {
      const response = await axios.get("http://localhost:3000/search/recent", {
        params: { user },
      });
      setRecentSearch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/search", {
        params: { search, accessToken },
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

  const handleTrack = async (e, track) => {
    e.preventDefault();
    const trackID = track.id;
    try {
      const response = await axios.post(
        "http://localhost:3000/search/add/track",
        {
          track,
          user,
        }
      );
      if (response) {
        const track = await axios.get("http://localhost:3000/search/track", {
          params: { trackID, accessToken },
        });
        if (track) setSelectedTrack(track.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlbum = async (e, album) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/search/add/album",
        {
          album,
          user,
        }
      );
      if (response) navigate(`/album/${album.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArtist = async (e, artist) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/search/add/artist",
        {
          artist,
          user,
        }
      );
      if (response) navigate(`/artist/${artist.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaylist = async (e, playlist) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/search/add/playlist",
        {
          playlist,
          user,
        }
      );
      if (response) navigate(`/playlist/${playlist.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="search-input" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={handleSearch}></input>
        <Link to="/home">Cancel</Link>
      </form>
      {!result && (
        <div className="recent-search">
          <h2>Recent Searches</h2>
          <ul className="results-list">
            {recentSearch.map((search) => {
              if (search.type === "album") {
                return (
                  <li key={search.id} className="result-item">
                    <button onClick={(e) => handleAlbum(e, search)}>
                      <img src={search.images[0].url} />
                      <div className="result-details">
                        <p>{search.name}</p>
                        <div className="result-meta">
                          <p>
                            {search.type.charAt(0).toUpperCase() +
                              search.type.slice(1) +
                              " •"}
                          </p>
                          {search.artists.map((artist) => (
                            <p key={artist.id}>{artist.name}</p>
                          ))}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              } else if (search.type === "artist") {
                return (
                  <li key={search.id} className="result-item">
                    <button onClick={(e) => handleArtist(e, search)}>
                      <img src={search.images[0].url} />
                      <div className="result-details">
                        <p>{search.name}</p>
                        <div className="result-meta">
                          <p>
                            {search.type.charAt(0).toUpperCase() +
                              search.type.slice(1)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              } else if (search.type === "track") {
                return (
                  <li key={search.id} className="result-item">
                    <button onClick={(e) => handleTrack(e, search)}>
                      <img src={search.album.images[0].url} />
                      <div className="result-details">
                        <p>{search.name}</p>
                        <div className="result-meta">
                          <p>
                            {search.type.charAt(0).toUpperCase() +
                              search.type.slice(1) +
                              " •"}
                          </p>
                          {search.artists.map((artist, index) => (
                            <span key={artist.id}>
                              {artist.name}
                              {index < search.artists.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              } else if (search.type === "playlist") {
                return (
                  <li key={search.id} className="result-item">
                    <button onClick={(e) => handlePlaylist(e, search)}>
                      <img src={search.images[0].url} />
                      <div className="result-details">
                        <p>{search.name}</p>
                        <div className="result-meta">
                          <p>
                            {search.type.charAt(0).toUpperCase() +
                              search.type.slice(1)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              } else {
                return null; // If type does not match, render nothing
              }
            })}
          </ul>
        </div>
      )}
      {result && (
        <div className="search-results">
          <h2>Results</h2>
          <ul className="results-list">
            {albums.map((album) => (
              <li key={album.id} className="result-item">
                <button onClick={(e) => handleAlbum(e, album)}>
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
                <button onClick={(e) => handleArtist(e, artist)}>
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
                <button onClick={(e) => handlePlaylist(e, playlist)}>
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
                <button onClick={(e) => handleTrack(e, track)}>
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
      <div>
        <Player accessToken={accessToken} trackUri={selectedTrack?.uri} />
      </div>
    </>
  );
}

export default Search;
