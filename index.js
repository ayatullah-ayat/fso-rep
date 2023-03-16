const express = require('express');

const app = express();

app.use(express.json());

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  app.get('/', (request, response) => {
    response.send('<a href="/notes">Notes</a>')
  })

  app.get('/notes', (request, response) => {
    response.json(notes);
  })
  app.post('/notes', (request, response) => {
    console.log('request body', request.body);
  })
  app.get('/api/notes/:id', (request, response) => {
    let id = Number(request.params.id);
    response.json(notes.find(note => note.id === id))
  })

const PORT = 3000;

app.listen(PORT);

console.log("Server running on ", PORT);