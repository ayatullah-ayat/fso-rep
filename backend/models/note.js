const config = require('../utils/config');
const mongoose = require('mongoose');
const url = config.MONGODB_URI;
mongoose.set('strictQuery', false);

console.log('Connecting Url........................', url);
mongoose.connect(url)
    .then( () => {
        console.log('Connected MongoDB');
        console.log('Connected URI', url);
    })
    .catch(err => {
        console.log('Connection failed', err.message);
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true,
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});



noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);