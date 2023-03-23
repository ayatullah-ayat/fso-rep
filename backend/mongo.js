const mongoose = require('mongoose');



const url = `mongodb+srv://ayat2486:jPF5kYRBrtykTJnA@clusterfso1.1zjsm5m.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);

Note.find({}).then(res => {
    res.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close();
})

// const note = new Note({
//     content: 'HTML is fantastic',
//     important: true,
// })

// note.save().then(res => {
//     console.log('Note saved');
//     mongoose.connection.close();
// })