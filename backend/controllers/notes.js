const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
    const authorization = request.get('authorization');

    if(authorization && authorization.startsWith('bearer ')){
        return authorization.replace('bearer ', '');
    }
    return null;
}

// index
notesRouter.get('/', (request, response) => 
{
    Note.find({}).populate('user', {
        username: 1,
        name: 1
    }).then((res, error) => {
        if(error){
            return response.status(500).send({error: "Internal Server Error with MongoDB"})
        }
        return response.status(200).json(res);
    })
})

// store
notesRouter.post('/', async (request, response, next) => {

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    if(!decodedToken.id) {
        response.status(401).json({
            error: 'token invalid'
        })
    }
    const user = await User.findById(decodedToken.id);

    const note = new Note({
        content: request.body.content,
        important: request.body.important || false,
        user: user.id,
    });
    let savedNote = await note.save();

    user.notes = user.notes.concat(savedNote._id);
    await user.save();
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
