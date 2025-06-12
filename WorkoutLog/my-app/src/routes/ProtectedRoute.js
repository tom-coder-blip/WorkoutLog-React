//The purpose of ProtectedRoute.js is to protect certain pages in your app 
// so that only authenticated (logged-in) users can access them. 
// If someone tries to access a protected page without being logged in, 
// they’ll automatically be redirected to the login page.

import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; //tries to access the currently logged-in user from Firebase Authentication.

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (i.e. the protected page)
  return children;
};

export default ProtectedRoute;