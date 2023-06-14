
import { useState, useEffect, useRef } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';
import NoteForm from './components/NoteForm';
import { appendNote, setNotes } from './reducers/noteReducer';
import { useDispatch, useSelector } from 'react-redux';

import { Routes, Route, Link, useNavigate, Navigate, useMatch } from 'react-router-dom';

import './App.css';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import Home from './components/Home';
import User from './components/User';
import SingleNote from './components/SingleNote';

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
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


    useEffect(() => {
        noteService.getAll().then(notes => {
            dispatch(setNotes(notes));
        })
    })

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
                navigate("/");
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

        const note = await noteService.createNewNoteJsonServer(content);

        dispatch(appendNote(note));
    }

    const notes = useSelector(state => {
        if(state.filter === 'ALL'){
            return state.notes;
        }

        return state.filter === 'IMPORTANT' ?
            state.notes.filter(note => note.important === true) :
            state.notes.filter(note => note.important === false);
    });

    const match = useMatch('/notes/:id');

    const note = match ? notes.find(note => note.id === Number(match.params.id)) : null

    return (

        <div className="App">

            <div className='container mt-3'>

                <div>
                    <Link style={{ padding: 5 }} to="/">Home</Link>
                    <Link style={{ padding: 5 }} to="/notes">Note</Link>
                    <Link style={{ padding: 5 }} to="/user">User</Link>
                    {user ?
                        user.name + ' Logged In'
                        : <Link style={{ padding: 5 }} to="/login">Login</Link>}
                </div>
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
                <VisibilityFilter />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/notes/:id' element={<SingleNote note={ note } />} />
                    <Route path='/notes' element={<Notes notes={ notes } />} />
                    <Route path='/user' element={ user ? <User /> : <Navigate replace to="/login" />} />
                    <Route path='/login' element={<LoginForm
                        username={username}
                        password={password}
                        handleUserNameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleLogin={handleLogin} />} />
                </Routes>
            </div>
        </div>

    );
}

export default App;
