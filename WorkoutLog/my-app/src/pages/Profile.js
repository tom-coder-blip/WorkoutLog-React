import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);

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
            </>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>
      </div>
    </>
  );
}