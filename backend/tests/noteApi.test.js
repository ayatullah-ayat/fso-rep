const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');


const api = supertest(app);

beforeEach(async () => {
    await Note.deleteMany({});
    // cleared
    const noteObjects = helper.initialNotes.map(note => new Note(note));
    const promiseArray = noteObjects.map(noteObject => noteObject.save());

    await Promise.all(promiseArray);
}, 100000)

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000);

test('All notes are return', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content);
    expect(contents).toContain('Browser can execute only JavaScript');
})

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
})

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteDeleteContent = notesAtStart[0];

    console.log('content========', noteDeleteContent);
    await api
        .delete('/api/notes/' + noteDeleteContent.id)
        .expect(204)

    let notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);
    const contents = notesAtEnd.map(r => r.content);

    expect(contents).not.toContain(noteDeleteContent.content);


})
test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    expect(response.body).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('note without content is not added', async () => {
    const note = {
        important: true
    }
    await api
        .post('/api/notes')
        .send(note)
        .expect(400)
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
});

afterAll(async () => {
    await mongoose.connection.close();
})
