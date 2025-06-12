//This file lets a user add a new workout and save it to Firebase Firestore (your database).

import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import Navbar from "../components/Navbar";
import "../styles/Form.css";

export default function AddWorkout() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  //handleSubmit is called when the form is submitted.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser; //Checks who is currently logged in.

      if (!user) {
        alert("You must be logged in");
        return;
      }

      //Adds a new document (record) to the "workouts" collection in the Firestore database.
      await addDoc(collection(db, "workouts"), {
        title,
        duration,
        notes,
        createdAt: serverTimestamp(),
        userId: user.uid
      });

      setTitle("");
      setDuration("");
      setNotes("");
      alert("Workout added! Have a look in your workouts.");
    } catch (error) {
      console.error("Error adding workout:", error);
      alert("Failed to add workout.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <h1>Add New Workout</h1>
        <form onSubmit={handleSubmit} className="workout-form">
          <input
            type="text"
            placeholder="Workout Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Duration (e.g. 45 mins)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button type="submit">Add Workout</button>
        </form>
      </div>
    </>
  );
}