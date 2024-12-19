import "./Login.css";

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import cassette from "./icons/cassette.png";
import { UserContext } from "./App";

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
        navigate("/home");
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
