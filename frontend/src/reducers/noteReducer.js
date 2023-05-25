

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const initialState = [
    {
        content: 'note 1',
        important: false,
        id: 1
    },
    {
        content: 'note 2',
        important: true,
        id: 2
    }
];

const noteReducer = (state = initialState, action) => {
    console.log('noteReducer_ACTION', action);
    if (action.type === 'NEW_NOTE') {
        return state.concat(action.payload);
    } else if (action.type === 'TOGGLE_IMPORTANCE') {
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

// const noteSlice = createSlice({
//     name: 'notes',
//     initialState,
//     reducers: {
//         createNote(state, action) {
//             const content = action.payload;
//             state.push({
//                 content,
//                 important: false,
//                 id: generateId()
//             });
//         },
//         toggleImportanceOf(state, action) {
//             const id = action.payload;
//             const noteToChange = state.find(note => note.id === id);

//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note => note.id !== id ? note : changedNote);
//         }
//     }
// });

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
