const express = require('express')
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');

const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use('/api/notes', notesRouter);
app.use(middleware.requestLogger);
app.use(express.static('build'));

const PORT = config.PORT || 3001;

app.listen(PORT);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);

logger.info("Server running on " + config.PORT);