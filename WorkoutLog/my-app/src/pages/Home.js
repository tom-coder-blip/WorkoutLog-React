import { Link } from "react-router-dom";
import "../styles/Home.css"; // optional for styling

function Home() {
  return (
    <div className="home-container">
      <h1>🏋️ BeastLog 🏋️</h1>
      <h3>Log your workout sessions</h3>
      <div className="home-buttons">
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/register" className="home-button">Register</Link>
        <Link to="/dashboard" className="home-button">Dashboard</Link>
      </div>
    </div>
  );
}

export default Home;