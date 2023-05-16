const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  console.log('notesInDb', notes);
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({});
  console.log('usersInDb', users);
  return users.map(user => user.toJSON());
}

module.exports = {
  initialNotes, 
  nonExistingId, 
  notesInDb,
  usersInDb,
}