import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { applyMiddleware } from './lib';
import { routes } from '../routes';
import { asArray } from './html-head';

const PORT = 3000;
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/assets', express.static(`${__dirname}/../../dist/assets`))

app.use(applyMiddleware({
  routes,
  header: asArray
}));

app.listen(PORT, () => console.log(`Listening on ${PORT} ...`))

module.exports = app
