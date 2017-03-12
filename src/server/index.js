import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import assetUrl from './lib/asset-url-middleware';
import contextMiddleware from './lib/context-middleware';
import htmlHead from './lib/html-head';
import isomorphicRenderer from './lib/isomorphic-renderer';

const PORT = 3000;
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(contextMiddleware);
app.use(assetUrl);

app.use('/assets', express.static(`${__dirname}/../../dist/assets`))

app.use(htmlHead);
app.use(isomorphicRenderer);

app.listen(PORT, () => console.log(`Listening on ${PORT} ...`))

module.exports = app
