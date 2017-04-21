import React from 'react';
import scaffold from './scaffold.js';
import fs from 'fs';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { styleSheet } from 'styled-components'

import getLocalContext from './get-local-context';
import withLocalContext from './with-local-context';
import getStageContext from './get-stage-context';
import getImageUrls from './get-image-urls';

function renderPage({renderProps, stageContext, imageUrls}) {
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
    {...renderProps, localContext, styleSheet, imageUrls},
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
        stageContext: getStageContext(req),
        imageUrls: getImageUrls()
      });
      res.status(200).send(html);

    } else {
      res.status(404).send('Not found');
    }
  })
};

export default isomorphicRenderer;
