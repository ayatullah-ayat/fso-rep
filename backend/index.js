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

Note.find({}).then(res => {
  console.log('res.........................', res);
})

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use(express.static('build'));

// index
app.get('/api/notes', (request, response) => {
  Note.find({}).then((res, error) => {
    if(error){
      return response.status(500).send({error: "Internal Server Error with MongoDB"})
    }
    return response.status(200).json(res);
  })
})

// store
app.post('/api/notes', (request, response, next) => {
  console.log('Posting new Note...', request.body);
   
  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
  });

  note.save()
  .then(res => {
    response.json(res);
  })
  .catch(error => next(error));

});

// show
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
  .then(note => {
    if(note){
      return response.status(200).json(note);
    }else{
      response.status(400).end();
    }
  })
  .catch(err => {
    next(err);
  })
});

// update
app.put('/api/notes/:id', (request, response, next) => {
  console.log('Updating.........');
  console.log(request.body);

  const note = {
    content: request.body.content,
    important: request.body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' })
  .then(updateNote => {
    response.json(updateNote);
  })
  .catch(error => next(error))
});

app.delete('/api/notes/:id', (request, response, next) => {
  console.log("Deleting......");

  Note.findByIdAndRemove(request.params.id)
  .then(deleteNote => response.json(deleteNote))
  .catch(error => next(error));
})

const PORT = process.env.PORT || 3001;

app.listen(PORT);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('errrr name========', error.name);

  if(error.name == 'CastError'){
    return response.status(400).send({error: 'Malformatted Id'});
  }
  else if(error.name == 'ValidationError') {
    return response.status(400).send({error: error.message})
  }

  next(error);
}

app.use(errorHandler);

console.log("Server running on ", PORT);