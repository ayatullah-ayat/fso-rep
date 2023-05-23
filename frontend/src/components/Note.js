
const Note = ({ note }) => {
    return(
        <li className='list-group-item note' key={note.id}>
            {note.content}
        </li>
    );
}

export default Note;