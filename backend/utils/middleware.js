import { info, error } from './logger.js'

const requestLogger = (req, res, next) => {
    info('-----------------------')
    info('req.method :>> ', req.method)
    info('req.path :>> ', req.path)
    info('req.body :>> ', req.body)
    info('-----------------------')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    error(error.message)
    
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'wrong/malformed id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' })
    }

    next(error)
}

export { requestLogger, unknownEndpoint, errorHandler }