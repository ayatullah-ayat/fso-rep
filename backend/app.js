const express = require('express')
const config = require('./utils/config');
const logger = require('./utils/logger');

const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');

const cors = require('cors');

const app = express();

logger.info('connecting to', config.MONGODB_URI)
// middleware
app.use(express.json());
app.use(cors());
app.use('/api/notes', notesRouter);
app.use(middleware.requestLogger);
app.use(express.static('build'));

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);

module.exports = app;