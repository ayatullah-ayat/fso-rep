
import { useState, useEffect, useRef } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';
import NoteForm from './components/NoteForm';
import { createNote } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';

import './App.css';
import Notes from './components/Notes';

function App() {

    const dispatch = useDispatch();

    // const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const [newNote, setNewNote] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     let request = noteService.getAll();
    //     request.then(res => setNotes(res.data));
    // }, []);

    useEffect(() => {
        const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
        if (loggedUser) {
            setUser(loggedUser)
            noteService.setToken(loggedUser.token);
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });

            if (user) {
                window.localStorage.setItem('loggedUser', JSON.stringify(user));

                noteService.setToken(user.token);
                setUser(user);
                setUsername('');
                setPassword('');
            }
        }
        catch (exception) {
            console.log('handleLogin_exception', exception);
        }
    }

    const noteFormRef = useRef();

    // const handleNote = async (event) => {
    //     event.preventDefault();

    //     if (newNote) {
    //         const response = await noteService.create({ content: newNote })
    //         setNotes([...notes, response]);
    //         setNewNote('');
    //         noteFormRef.current.toggleVisibility();
    //     }

    // }

    const addNote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        event.target.note.value = '';

        dispatch(createNote(content));
    }

    return (
        <div className="App">

            <div className='container mt-3'>

                <form onSubmit={addNote}>
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <input
                            type="text"
                            name='note'
                            className="form-control" />
                    </div>
                    <div className='mt-3'>
                        <button type="submit" className="btn btn-primary">Save Note</button>
                    </div>
                </form>
                {!user &&
                    <Toggable btnLabel='Login'>
                        <LoginForm
                            username={username}
                            password={password}
                            handleUserNameChange={({ target }) => setUsername(target.value)}
                            handlePasswordChange={({ target }) => setPassword(target.value)}
                            handleLogin={handleLogin} />
                    </Toggable>
                }

                {user &&
                    <div>
                        <p>{user.name} Logged in...</p>
                        <Toggable btnLabel='Add Note' ref={noteFormRef}>
                            <NoteForm
                                newNote={newNote}
                                handleNote={addNote}
                                handleInputNewNoteChange={({ target }) => setNewNote(target.value)}
                            />
                        </Toggable>
                    </div>
                }
                <h1>Notes</h1>
                <Notes />
            </div>
        </div>
    );
}

export default App;
