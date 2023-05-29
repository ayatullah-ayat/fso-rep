import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchNotes, addNote } from './request';

import './App.css';

function App() {


    const queryClient = useQueryClient();

    const result = useQuery(
        'notes',
        fetchNotes, {
            refetchOnWindowFocus: false
        }
    )

    const newNoteMutation = useMutation(addNote, {
        onSuccess: (newNote) => {
            const notes = queryClient.getQueryData('notes');
            queryClient.setQueryData('notes', notes.concat(newNote));
        },
    });

    const createNewNote = (event) => {
        event.preventDefault();

        const content = event.target.note.value;
        event.target.note.value = '';

        newNoteMutation.mutate({ content, important: false })
    }
    if(result.isLoading) {
        return <div>loading data...</div>
    }
    const notes = result.data.data;
    return (
        <div className="App">
            <div className='container mt-3'>
                <form onSubmit={ createNewNote }>
                    <label htmlFor="note">Note</label>
                    <input type="text" name='note' className='form-control' />
                    <button className='btn btn-sm btn-success' type='submit'>Save</button>
                </form>
                <h1>Notes</h1>
                <ul className='list-group'>
                    { notes.map(note => {
                        return (<li key={ note.id }>{ note.content }</li>)
                    } ) }
                </ul>
            </div>
        </div>
    );
}

export default App;
