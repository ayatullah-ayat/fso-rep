const express = require('express');
require('dotenv').config();

const Note = require('./models/note');
const cors = require('cors');

const app = express();

// middleware
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);

  console.log('___');

  next();
}

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use(express.static('build'));

app.get('/api/notes', (request, response) => {
  Note.find({}).then((res, error) => {
    if(error){
      return response.status(500).send({error: "Internal Server Error with MongoDB"})
    }
    return response.status(200).json(res);
  })
})
app.post('/api/notes', (request, response) => {
  console.log('Posting new Note...', request.body);
  if(request.body.content === undefined){
    return response.status(400).json({error: 'Body Content Missing'})
  }  
  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
  });

  note.save()
  .then(res => {
    response.json(res);
  });

});



app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
  .then(note => {
    if(note){
      return response.status(200).json(note);
    }else{
      response.status(400).end();
    }
  })
  .catch(err => {
    console.log('err', err);
    response.status(400).send({error: 'Malformatted Id'});
  })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

console.log("Server running on ", PORT);