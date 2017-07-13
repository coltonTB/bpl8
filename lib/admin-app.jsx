import express from 'express'
import basicAuth from 'express-basic-auth';

import { renderPage } from './isomorphic-renderer';
import getStageContext from './get-stage-context';
import fetchSiteContent from './fetch-site-content';
import adminScaffold from './admin-scaffold.js';

const app = express();
const authConfig = {
  users: {
    colton: '4goodmeasure'
  },
  challenge: true,
  realm: 'ihnjq5hmd4'
};

app.get('/', basicAuth(authConfig), (req, res) => {
  const stageContext = getStageContext(req);
  fetchSiteContent(stageContext, (err, content) => {
    const html = renderPage({
      locals: {
        stageContext,
        content
      },
      scaffolder: adminScaffold
    });
    res.status(200).send(html);
  });
});

export default app;
