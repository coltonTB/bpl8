import React from 'react';
import scaffold from './scaffold.js';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import getLocalContext from './get-local-context';
import withLocalContext from './with-local-context';

const defaultStageContext = {
  stage: 'local',
  resourceBase: '',
  assetBase: ''
};

/*
  Extract stage variables from API gateway
*/
function getStageContext(req) {
  let stageContext;
  const apiGatewayEventHeader = req.headers['x-apigateway-event']
  if (apiGatewayEventHeader) {
    try {
      stageContext = JSON.parse(apiGatewayEventHeader).stageVariables;
    } catch (e) {}
  }
  return stageContext || defaultStageContext;
}

function renderPage({renderProps, stageContext}) {
  const localContext = getLocalContext({stageContext});
  /*
    Hijack createHref function to synchronize assetUrl
    with anchor tags
  */
  const oldCreateHref = renderProps.router.createHref;
  renderProps.router.createHref = path =>
    localContext.resourceUrl(oldCreateHref(path))

  /*
    Render React application root
  */
  const RouterContextWithLocalContext = withLocalContext(
    RouterContext,
    localContext
  );
  const appContent = renderToString(
    <RouterContextWithLocalContext {...renderProps} />
  );

  /*
    Inject app content into the HTML scaffold
  */
  return scaffold(
    {...renderProps, localContext},
    appContent
  );
}

const isomorphicRenderer = routes => (req, res) => {
  match({
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      const html = renderPage({
        renderProps,
        stageContext: getStageContext(req)
      });
      res.status(200).send(html);

    } else {
      res.status(404).send('Not found');
    }
  })
};

export default isomorphicRenderer;
