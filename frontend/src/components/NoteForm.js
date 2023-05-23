

const NoteForm = ({
    newNote,
    handleNote,
    handleInputNewNoteChange
}) => {

    return (
        <form onSubmit={handleNote}>
            <div className="form-group">
                <label htmlFor="note">Note</label>
                <input
                    type="text"
                    className="form-control"
                    value={newNote}
                    onChange={ handleInputNewNoteChange } />
            </div>
            <div className='mt-3'>
                <button type="submit" className="btn btn-primary">Save Note</button>
            </div>
        </form>
    );
}

export default NoteForm;