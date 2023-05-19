
import { useState, useEffect } from 'react';
import getAll from './services/notes';
import './App.css';
function App() {

  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let request = getAll();

    request.then(res => setNotes(res.data));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('user', username, password);
  }

  return (
    <div className="App">

      <div className='container'>
        
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">User Name</label>
          <input 
              type="text" 
              className="form-control"
              value={username} 
              onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              className="form-control"
              value={password} 
              onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div className='mt-3'>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

      <h1>Notes</h1>
      <ul className='list-group'>
        {notes.map(note => <li className='list-group-item' key={note.id}>{note.content}</li>)}
      </ul>
      </div>
    </div>
  );
}

export default App;
