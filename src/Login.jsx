import "./Login.css";

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import cassette from "./icons/cassette.png";
import { UserContext } from "./App";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      if (response) {
        userContext.setUser(response.data);
        navigate("/auth");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="login-container">
        <h1>Tunes</h1>
        <img src={cassette} className="cassette-icon" />
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={handleEmail}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
      <footer>
        <a
          href="https://www.flaticon.com/free-animated-icons/retro"
          title="retro animated icons"
        >
          Retro animated icons created by Freepik - Flaticon
        </a>
      </footer>
    </>
  );
}

export default Login;
