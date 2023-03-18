
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
function App() {

  const [notes, setNotes] = useState([]);
  const hook = () => {
    axios.get('http://localhost:3001/notes')
        .then(res => {
          console.log('Promise Fullfilled', res.data);
          setNotes(res.data);
        })
  }
  console.log('notes length', notes.length);
  useEffect(hook, [])
  
  return (
    <div className="App">
      <h1>Notes</h1>
    </div>
  );
}

export default App;
