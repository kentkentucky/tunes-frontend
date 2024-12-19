import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import Login from "./Login";
import Home from "./Home";
import Search from "./Search";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
