//Fetches workouts from the Firebase Firestore database.

import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; //these functions from firebase allow us to fetch, edit and delete documents from firestore database
import Navbar from "../components/Navbar";
import "../styles/Workouts.css";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]); //stores the list of workouts
  const [editingId, setEditingId] = useState(null); //Stores the ID of the workout being edited.
  const [deletingId, setDeletingId] = useState(null); //Stores the ID of the workout being deleted
  const [editForm, setEditForm] = useState({
    title: "",
    duration: "",
    notes: "",
  }); //Stores the current input values while editing a workout.

  //Fetches all workouts from the "workouts" collection in Firestore.
  const fetchWorkouts = async () => {
    const querySnapshot = await getDocs(collection(db, "workouts"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWorkouts(data);
  };

  //Deletes the workout with the given id.
  const confirmDelete = async (id) => {
    await deleteDoc(doc(db, "workouts", id));
    setDeletingId(null);
    fetchWorkouts();
  };

  const startEditing = (workout) => {
    setEditingId(workout.id);
    setEditForm({
      title: workout.title,
      duration: workout.duration,
      notes: workout.notes,
    });
    setDeletingId(null); // prevent conflicts
  };

  //This uses a functional update that reads which input field is being changed and its new value.
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value })); //{ ...prev } copies all existing values in the form.
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "workouts", id), {
      title: editForm.title,
      duration: editForm.duration,
      notes: editForm.notes,
    });
    setEditingId(null);
    fetchWorkouts();
  };

  //This runs fetchWorkouts() once when the page loads.
  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page">
        <h1>Your Workouts</h1>
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li key={workout.id}>
              {editingId === workout.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    name="duration"
                    value={editForm.duration}
                    onChange={handleEditChange}
                    placeholder="Duration"
                  />
                  <input
                    type="text"
                    name="notes"
                    value={editForm.notes}
                    onChange={handleEditChange}
                    placeholder="Notes"
                  />
                  <div className="actions">
                    <button onClick={() => handleUpdate(workout.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : deletingId === workout.id ? (
                <div className="delete-confirm">
                  <p>Are you sure you want to delete this workout?</p>
                  <div className="actions">
                    <button onClick={() => confirmDelete(workout.id)}>Yes</button>
                    <button onClick={() => setDeletingId(null)}>No</button>
                  </div>
                </div>
              ) : (
                <>
                  <strong>{workout.title}</strong> - {workout.notes} ({workout.duration} min)
                  <div className="actions">
                    <button onClick={() => startEditing(workout)}>Edit</button>
                    <button onClick={() => setDeletingId(workout.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}