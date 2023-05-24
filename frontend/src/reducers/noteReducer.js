
const noteReducer = (state = [], action) => {
    if(action.type === 'NEW_NOTE'){
        state.concat(action.payload);
        return state;
    }else if(action.type === 'TOGGLE_IMPORTANCE'){
        const id = action.payload.id;

        const noteToChange = state.find(note => note.id === id);

        const changedNote = {
            ...noteToChange,
            important: !noteToChange.important
        }
        return state.map(note => note.id !== id ? note : changedNote);
    }

    return state;
}

export default noteReducer;