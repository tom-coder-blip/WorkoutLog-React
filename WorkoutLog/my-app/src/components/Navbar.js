import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/workouts">Workouts</Link>
      <Link to="/add-workout">Add Workout</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;