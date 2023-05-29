import { useQuery } from 'react-query';

import './App.css';
import axios from 'axios';

function App() {


    const result = useQuery(
        'notes',
        () => axios.get('http://localhost:3001/notes').then(notes => notes)
    )

    console.log('result========', result);
    if(result.isLoading) {
        return (
            <div>loading data...</div>
        )
    }
    const notes = result.data;

    return (
        <div className="App">
            <div className='container mt-3'>
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
