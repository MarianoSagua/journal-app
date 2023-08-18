import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteImageNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { displayName } = getState().auth;

    dispatch(savingNewNote());

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(
      collection(FirebaseDB, `/journal-users/${displayName}/notes`)
    );
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid, displayName);
    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { displayName } = getState().auth;
    const { active: noteActive } = getState().journal;

    const noteToFirestore = { ...noteActive };
    delete noteToFirestore.id;

    const docRef = doc(
      FirebaseDB,
      `/journal-users/${displayName}/notes/${noteActive.id}`
    );

    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updateNote(noteActive));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { displayName } = getState().auth;
    const { active: activeNote } = getState().journal;

    const docRef = doc(
      FirebaseDB,
      `/journal-users/${displayName}/notes/${activeNote.id}`
    );

    await deleteDoc(docRef);
    dispatch(deleteNoteById(activeNote.id));
  };
};
