import Note from "./Note";
// import axios from "axios";

const Notes = ( { notes } ) => {

    return (
        <div>
            <h1>Notes</h1>
            <ul className='list-group'>
                {notes.map(note => <Note note={note}  key={note.id} />)}
            </ul>
        </div>
    );
}

export default Notes;