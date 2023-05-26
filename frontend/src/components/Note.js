import { useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";



const Note = ({ note }) => {

    const dispatch = useDispatch();

    const changeImportanceOf = async (id) => {
        console.log('Note_changeImportanceOf_id', id);
        dispatch(toggleImportanceOf(id))
    }
    return(
        <li className='list-group-item note' key={note.id}>
            {note.content}
            <button className="btn btn-secondary btn-sm" onClick={() => changeImportanceOf(note.id)}>{ note.important ? 'Make not Important' : 'Make Important' }</button>
        </li>
    );
}

export default Note;