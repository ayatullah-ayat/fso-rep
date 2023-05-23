
const Note = ({ note }) => {
    return(
        <li className='list-group-item note' key={note.id}>
            {note.content}
            <button className="btn btn-secondary btn-sm">Make not Important</button>
        </li>
    );
}

export default Note;