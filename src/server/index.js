import awsServerlessExpress from 'aws-serverless-express';
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { routes } from '../routes';
import {contextMiddleware, urlHelperMiddleware} from './lib/middleware';
import isomorphicRenderer from './lib/isomorphic-renderer';

const PORT = 3000;
const app = express()

let serverlessExpress = null;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(contextMiddleware);
app.use(urlHelperMiddleware);

/*
  Note: locally, the server runs out of 'dist'
*/
app.use('/assets', express.static(`${__dirname}/assets`))
app.use('/images', express.static(`${__dirname}/images`))

app.use(isomorphicRenderer(routes));

module.exports = {
  app,
  awsServerlessProxy(event, context) {
    if (!serverlessExpress) {
      serverlessExpress = awsServerlessExpress.createServer(app);
    }
    awsServerlessExpress.proxy(serverlessExpress, event, context)
  },
  startServer(port=PORT) {
    app.listen(port, () => `Listening on ${port} ...`)
  }
}
