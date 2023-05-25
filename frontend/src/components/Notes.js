import { useSelector } from "react-redux";
import Note from "./Note";

const Notes = () => {
    const notes = useSelector(state => state);
    return (
        <ul className='list-group'>
            {notes.map(note => <Note note={note} key={note.id} />)}
        </ul>
    );
}

export default Notes;