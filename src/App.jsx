import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import Login from "./Login";
import Home from "./Home";
import Search from "./Search";
import Album from "./Album";
import Artist from "./Artist";
import OnlinePlaylist from "./OnlinePlaylist";
import Auth from "./Auth";

export const UserContext = createContext();
export const TokenContext = createContext();
export const TrackContext = createContext();

function App() {
  const [user, setUser] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <TokenContext.Provider
        value={{ accessToken: accessToken, setAccessToken: setAccessToken }}
      >
        <TrackContext.Provider
          value={{
            queue: queue,
            setQueue: setQueue,
            currentTrack: currentTrack,
            setCurrentTrack: setCurrentTrack,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/album/:albumID" element={<Album />} />
              <Route path="/artist/:artistID" element={<Artist />} />
              <Route
                path="/playlist/:playlistID"
                element={<OnlinePlaylist />}
              />
            </Routes>
          </BrowserRouter>
        </TrackContext.Provider>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
