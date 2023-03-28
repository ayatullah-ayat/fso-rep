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
notesRouter.post('/', (request, response, next) => {
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
notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.delete('/:id', (request, response, next) => {
    console.log("Deleting......");

    Note.findByIdAndRemove(request.params.id)
        .then(deleteNote => response.json(deleteNote))
        .catch(error => next(error));
})

module.exports = notesRouter;
