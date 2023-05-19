const logger = require('./logger');

const unknownEndpoint = (request, response) => 
{
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error('errrr name========', error.name);

    if(error.name == 'CastError'){
        return response.status(400).send({error: 'Malformatted Id'});
    }
    else if(error.name == 'ValidationError') {
        return response.status(400).send({error: error.message})
    }
    else if(error.name === 'JsonWebTokenError'){
        return response.status(400).json({ 
            error: error.message,
            type: error.name 
        });
    }else if(error.name === 'TokenExpiredError'){
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error);
}

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);

    console.log('___');

    next();
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger,
}