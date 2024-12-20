import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

import Login from "./Login";
import Home from "./Home";
import Search from "./Search";
import Album from "./Album";
import Artist from "./Artist";
import OnlinePlaylist from "./OnlinePlaylist";
import Auth from "./Auth";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/album/:albumID" element={<Album />} />
          <Route path="/artist/:artistID" element={<Artist />} />
          <Route path="/playlist/:playlistID" element={<OnlinePlaylist />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
