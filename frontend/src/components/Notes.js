import { useSelector } from "react-redux";
import Note from "./Note";
// import axios from "axios";

const Notes = () => {
    const notes = useSelector(state => {
        if(state.filter === 'ALL'){
            return state.notes;
        }

        return state.filter === 'IMPORTANT' ?
            state.notes.filter(note => note.important === true) :
            state.notes.filter(note => note.important === false);
    });
    return (
        <div>
            <h1>Notes</h1>
            <ul className='list-group'>
                {notes.map(note => <Note note={note} key={note.id} />)}
            </ul>
        </div>
    );
}

export default Notes;