
import { useState, useEffect } from 'react';
import noteService from './services/notes';
import loginService from "./services/login";

import './App.css';
function App() {

    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const [newNote, setNewNote] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        let request = noteService.getAll();
        request.then(res => setNotes(res.data));
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem('loggedUser', JSON.stringify(user));

            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        }
        catch (exception) {
            console.log('handleLogin_exception', exception);
        }
    }

    const handleNote = async (event) => {
        event.preventDefault();

        console.log('content=========', newNote);
        if(newNote) {
            const response = await noteService.create({content: newNote})
            console.log('created_note', response);
        }

    }


    const LoginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)} />
                </div>
                <div className='mt-3'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }

    const NoteForm = () => {
        return (
            <form onSubmit={handleNote}>
                <div className="form-group">
                    <label htmlFor="note">Note</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={newNote}
                        onChange={({ target }) => setNewNote(target.value)} />
                </div>
                <div className='mt-3'>
                    <button type="submit" className="btn btn-primary">Save Note</button>
                </div>
            </form>
        );
    }

    return (
        <div className="App">

            <div className='container'>
                { user === null && <LoginForm />}

                <h1>Notes</h1>
                <ul className='list-group'>
                    {notes.map(note => <li className='list-group-item' key={note.id}>{note.content}</li>)}
                </ul>
                <NoteForm />
            </div>
        </div>
    );
}

export default App;
