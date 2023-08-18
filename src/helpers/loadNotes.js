import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "", displayName) => {
  if (!uid) throw new Error("El UID del usuario no existe");

  const collectionRef = collection(FirebaseDB, `/journal-users/${displayName}/notes`);
  const docs = await getDocs(collectionRef);

  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
