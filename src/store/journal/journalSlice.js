import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        createNewNote: ( state ) => {
            state.active = {
                title:'',
                body:'',
                date: new Date().getTime(),
                imageUrls: []
            };
        },
        addNewNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
            state.messageSaved = 'Nota creada';
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if(action.payload.id === note.id) return action.payload;
                else return note;
            });
            state.messageSaved = `Nota actualizada correctamente.`;
        },
        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrls = [ ... state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesOnLogout: ( state ) => {
            state.notes = [];
            state.isSaving = false;
            state.messageSaved = '';
            state.active = null;
        },
        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
        removeActive: ( state ) => {
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewNote,
    deleteNoteById,
    clearNotesOnLogout,
    createNewNote,
    removeActive,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;