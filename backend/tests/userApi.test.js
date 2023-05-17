const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

describe('Initial one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        let passwordHash = await bcrypt.hash('secret', 10);

        const user = new User({
            username: 'root',
            passwordHash: passwordHash
        })
        await user.save();
    }, 100000);

    test('creation succeded with a fresh user', async () => {
        const usersAtStart = await helper.usersInDb();

        console.log('usersAtStart==========================', usersAtStart);
        const newUser = {
            username: 'ayat-dev',
            name: 'Ayatullah Khameni',
            password: 'secret'
        };


        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation failed with proper status code and validation message', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            name: 'Super User',
            username: 'root',
            password: 'password'
        };

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique');
        
        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toEqual(usersAtStart);
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })
});