const express = require('express')
const config = require('./utils/config');
const logger = require('./utils/logger');
require('express-async-errors');
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');

const cors = require('cors');

const app = express();

logger.info('connecting to', config.MONGODB_URI)
// middleware
app.use(express.json());
app.use(cors());
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use(middleware.requestLogger);
app.use(express.static('build'));

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);

module.exports = app;