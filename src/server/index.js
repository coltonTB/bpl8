import awsServerlessExpress from 'aws-serverless-express';
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import serverRenderer from '../../lib/server-renderer';
import adminApp from '../../lib/admin-app.jsx';
import redirectApp from './redirect.js';
import globalStyles from '../shared/style.js';
import genStore from '../shared/gen-store';

const PORT = process.env.PORT || 3000;
const app = express();

let serverlessExpress = null;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
  Note: locally, the server runs out of 'dist'
*/
app.use('/assets', express.static(`${__dirname}/../static/assets`))
app.use('/images', express.static(`${__dirname}/../static/images`))

app.get('/health', (req, res) => res.send('OK'));

app.use('/admin', adminApp);

// inject global styles
app.use((req, res, next) => {
  globalStyles();
  next();
});

app.use(redirectApp);

app.use(serverRenderer(genStore));

module.exports = {
  app,
  awsServerlessProxy(event, context) {
    /*
      Proxy APIGateway events to the expres server
    */
    if (!serverlessExpress) {
      serverlessExpress = awsServerlessExpress.createServer(app);
    }
    awsServerlessExpress.proxy(serverlessExpress, event, context)
  },

  startServer(port=PORT) {
    try {
      app.listen(port, () => `Listening on ${port} ...`)
    } catch (e) {
      console.log(e);
    }
  }
}
