
import { useState, useEffect } from 'react';
import getAll from './services/notes';
import './App.css';
function App() {

  const [notes, setNotes] = useState([]);
 
  useEffect(() => {
    let request = getAll();
    
    request.then(res => setNotes(res.data));
  }, []);
  
  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>
        { notes.map(note => <li key={note.id}>{note.content}</li>) }
      </ul>
    </div>
  );
}

export default App;
