import axios from "axios";


export const addNote = (newNote) => axios.post('http://localhost:3001/notes', newNote).then(note => note);

export const fetchNotes = () => axios.get('http://localhost:3001/notes').then(notes => notes);