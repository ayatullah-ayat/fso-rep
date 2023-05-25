const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteReducer = (state = [], action) => {
    if(action.type === 'NEW_NOTE'){
        return state.concat(action.payload);
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

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}
export const toggleImportanceOf = id => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

export default noteReducer;
