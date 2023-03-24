const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const url = `mongodb+srv://ayat2486:jPF5kYRBrtykTJnA@clusterfso1.1zjsm5m.mongodb.net/noteApp?retryWrites=true&w=majority`;

const app = express();
(async () => {
  mongoose.set('strictQuery', false);
  
  await mongoose.connect(url);

})()


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
  }
});
const Note = mongoose.model('Note', noteSchema);


Note.find({}).then(res => {
  res.forEach(note => {
      console.log(note);
  })
  
});
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  
  console.log('___');
  
  next();
}

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(express.static('build'));

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
    response.send('<a href="/api/notes">Notes</a>')
  })

  app.get('/api/notes', async (request, response) => {
    let notes = await Note.find({}).then(res => {
      res.forEach(note => {
        response.json({note});
      })
  })
    
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