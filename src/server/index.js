import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import isomorphicRenderer from './lib/isomorphic-renderer';
import contextMiddleware from './lib/context-middleware';

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(contextMiddleware);

app.use('/assets', express.static(`${__dirname}/../../dist/assets`))
app.get('/headers', (req, res) => res.send(req.headers))
app.use(isomorphicRenderer);

app.listen(3000, () => console.log('Listening ...'))

module.exports = app
