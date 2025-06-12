import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";

export default function Dashboard() {

  const userName = localStorage.getItem("userName"); //retrieves the user’s name stored earlier when they logged in.
  
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-header">Welcome to Your Dashboard, {userName}</h1>
        <p className="dashboard-subtext">Track your workouts and stay on top of your goals.</p>

        <div className="dashboard-cards">

          <Link to="/workouts" className="card-link">
            <div className="card">
              <h3>My Workouts</h3>
              <p>View and manage all your workout logs.</p>
            </div>
          </Link>

          <Link to="/add-workout" className="card-link">
            <div className="card">
              <h3>Add Workout</h3>
              <p>Quickly add a new session to your log.</p>
            </div>
          </Link>

          <Link to="/profile" className="card-link">
            <div className="card">
              <h3>My Profile</h3>
              <p>Update your profile and preferences.</p>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
}