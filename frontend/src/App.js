
import { useState, useEffect, useRef } from 'react';
import noteService from './services/notes';
import loginService from "./services/login";
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';
import NoteForm from './components/NoteForm';

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

  const handleNote = async (event) => {
    event.preventDefault();

    if (newNote) {
      const response = await noteService.create({ content: newNote })
      setNotes([...notes, response]);
      setNewNote('');
      noteFormRef.current.toggleVisibility();
    }

  }

  return (
    <div className="App">

      <div className='container mt-3'>

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
            <p>{ user.name } Logged in...</p>
            <Toggable btnLabel='Add Note' ref={ noteFormRef }>
              <NoteForm
                newNote={newNote}
                handleNote={handleNote}
                handleInputNewNoteChange={({ target }) => setNewNote(target.value)}
              />
            </Toggable>
          </div>
        }
        <h1>Notes</h1>
        <ul className='list-group'>
          {notes.map(note => <li className='list-group-item' key={note.id}>{note.content}</li>)}
        </ul>

      </div>
    </div>
  );
}

export default App;
