//This App.js file is the main entry point for your app's pages. 
// It tells the app which page (component) to show based on the URL.

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import AddWorkout from "./pages/AddWorkout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute"; // a special wrapper that checks if you're logged in before showing a page
import Home from "./pages/Home";

//This is the main component for your app’s routing.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workouts"
        element={
          <ProtectedRoute>
            <Workouts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-workout"
        element={
          <ProtectedRoute>
            <AddWorkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
