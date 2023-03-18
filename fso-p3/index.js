const express = require('express');

const app = express();

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  
  console.log('___');
  
  next();
}
app.use(express.json());

app.use(requestLogger);

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

  app.get('/api/notes', (request, response) => {
    response.json(notes);
  })
  app.post('api/notes', (request, response) => {
    console.log('request body', request.body);
  })
  app.get('/api/notes/:id', (request, response) => {
    let id = Number(request.params.id);
    response.json(notes.find(note => note.id === id))
  })

const PORT = process.env.PORT || 3001;

app.listen(PORT);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

console.log("Server running on ", PORT);