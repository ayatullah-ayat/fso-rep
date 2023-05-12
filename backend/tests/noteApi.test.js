const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');


const api = supertest(app);

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    },
]

beforeEach(async () => {
    await Note.deleteMany({});
    let noteObject = new Note(helper.initialNotes[0]);
    await noteObject.save();
    noteObject = new Note(helper.initialNotes[1]);
    await noteObject.save();
}, 100000)

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000);

test('All note are return', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content);
    expect(contents).toContain('Browser can execute only JavaScript');
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

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('a note with not posted', async() => {
    const note = {
        important: true
    }
    await api
            .post('/api/notes')
            .send(note)
            .expect(400)
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(initialNotes.length);
});

afterAll(async () => {
    await mongoose.connection.close();
})
