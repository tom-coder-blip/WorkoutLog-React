//Login page for React app that allows users to log in using their email and password

import { useState } from "react"; 
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // lets you redirect the user to another page (e.g. /dashboard).
import "../styles/Auth.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // New: name field
  const navigate = useNavigate(); // lets you redirect the user to another page after login. Navigates to ("/dashboard").

  //This function runs when the user clicks the Login button.
  const handleLogin = async (e) => {
    e.preventDefault(); //stops the page from refreshing.
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Optionally store name in localStorage or context if needed
      localStorage.setItem("userName", name);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

