import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { useParams } from "react-router-dom";


const SingleNote = () => {

    const notes = useSelector(state => state.notes);
    const id = useParams().id;
    const note = notes.filter(note => note.id === Number(id));

    console.log('notes===============================', notes);
    const dispatch = useDispatch();

    const changeImportanceOf = async (id) => {
        console.log('Note_changeImportanceOf_id', id);
        dispatch(toggleImportanceOf(id))
    }
    return(
        <div className='list-group-item note' key={ note.id }>
            <h2>{ note[0].content }</h2>
            <button className="btn btn-secondary btn-sm" onClick={() => changeImportanceOf(note.id)}>{ note.important ? 'Make not Important' : 'Make Important' }</button>
        </div>
    );
}

export default SingleNote;