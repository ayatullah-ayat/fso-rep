const express = require('express')
const config = require('./utils/config');
const logger = require('./utils/logger');
require('express-async-errors');
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');

const url = config.MONGODB_URI;

const cors = require('cors');

const app = express();

mongoose.set('strictQuery', false);
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(url)
    .then( () => {
        console.log('Connected MongoDB');
        console.log('Connected URI', url);
    })
    .catch(err => {
        console.log('Connection failed', err.message);
    })
// middleware
app.use(express.json());
app.use(cors());
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.requestLogger);
app.use(express.static('build'));

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);

module.exports = app;