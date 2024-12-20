import "./Auth.css";

function Auth() {
  const handleClick = async (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/auth";
  };

  return (
    <div className="auth-container">
      <button onClick={handleClick} className="auth-btn">
        Log in with Spotify
      </button>
    </div>
  );
}

export default Auth;
