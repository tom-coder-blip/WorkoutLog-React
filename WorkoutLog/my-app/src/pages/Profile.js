import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({
            ...docSnap.data(),
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          });
        } else {
          console.log("No profile found!");
        }
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      // Delete Firestore profile document
      await deleteDoc(doc(db, "users", user.uid));

      // Delete Firebase Auth account
      await user.delete();

      alert("Your account has been deleted.");
      navigate("/register");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. You may need to log in again before deleting.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h1>My Profile</h1>
          {profile ? (
            <>
              <img
                src={profile.photoURL || "/default-profile.png"}
                alt="Profile"
                className="profile-pic"
              />
              <p><strong>Name:</strong> {profile.name} {profile.surname}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <button className="delete-button" onClick={handleDeleteAccount}>
                Delete My Account
              </button>
            </>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>
      </div>
    </>
  );
}
