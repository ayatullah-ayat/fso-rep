const notesRouter = require('express').Router();
const Note = require('../models/note');

// index
notesRouter.get('/', (request, response) => 
{
    Note.find({}).then((res, error) => {
        if(error){
            return response.status(500).send({error: "Internal Server Error with MongoDB"})
        }
        return response.status(200).json(res);
    })
})

// store
notesRouter.post('/', async (request, response, next) => {

    const note = new Note({
        content: request.body.content,
        important: request.body.important || false,
    });
    let savedNote = await note.save();
    response.status(201).json(savedNote);
});

// show
notesRouter.get('/:id', async (request, response, next) => {
    const note = await Note.findById(request.params.id);
    if(note){
        return response.status(200).json(note);
    }else{
        response.status(400).end();
    }
});

// update
notesRouter.put('/:id', (request, response, next) => {
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

notesRouter.delete('/:id', async (request, response, next) => {
    console.log("Deleting......");

    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
})

module.exports = notesRouter;
