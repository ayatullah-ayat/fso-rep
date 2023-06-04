import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const SingleNote = () => {

    const notes = useSelector(state => state.notes);
    const id = useParams().id;
    const note = notes.find(note => note.id === Number(id));

    console.log('notes===============================', note);

    return(
        <div className='list-group-item note' key={ note.id }>
            <h2>{ note.content }</h2>
        </div>
    );
}

export default SingleNote;