const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

mongoose.connect(url)
.then(result => {
    console.log('Connected MongoDB');
    console.log('Connected URI', url);
})
.catch(err => {
    console.log('Connection failed', err.message);
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});



noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);