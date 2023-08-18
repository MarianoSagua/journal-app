import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
    clearNotesLogOut: (state) => {
      state.isSaving = false;
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, { payload }) => {
      state.notes = state.notes.filter((note) => note.id !== payload);
      state.active = null;
    },
    deleteImageNote: (state, { payload }) => {
      state.active.imageUrls = state.active.imageUrls.filter((image) => image.url !== payload);
    },
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogOut,
  deleteImageNote,
} = journalSlice.actions;
