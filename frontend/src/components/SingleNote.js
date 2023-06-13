
const SingleNote = ({ note }) => {


    console.log('notes===============================', note);

    return(
        <div className='list-group-item note' key={ note.id }>
            <h2>{ note.content }</h2>
        </div>
    );
}

export default SingleNote;