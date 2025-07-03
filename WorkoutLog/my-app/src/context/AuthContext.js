//This file sets up global user authentication state using React Context. 
// It lets you access the logged-in user and perform logout from any part of your React app, 
// without passing props manually.
// Tracking the Logged-In User

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"; //onAuthStateChanged: detects if user is logged in or logged out.
import { auth } from "../firebase/firebaseConfig";

const AuthContext = createContext(); //creates a context object called AuthContext. It will hold the user data and logout function and share them across the app.

//This component wraps your entire app and provides authentication data to all components inside it.
//The children prop represents the component wrapped inside this route
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //If no user is logged in, it remains null.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("userName");
  };

  //This wraps the app with the AuthContext.Provider and passes down user and logout to child components
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);