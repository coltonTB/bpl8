import React from 'react';
import scaffold from './scaffold.js';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import withLocalContext from './with-local-context';

const renderPage = (res, renderProps) => {
  /*
    Hijack createHref function to synchronize assetUrl
    with anchor tags
  */
  const oldCreateHref = renderProps.router.createHref;
  renderProps.router.createHref = path =>
    res.locals.resourceUrl(oldCreateHref(path))

  /*
    Render React application root
  */
  const RouterContextWithLocalContext = withLocalContext(
    RouterContext,
    {locals: res.locals}
  );
  const appContent = renderToString(
    <RouterContextWithLocalContext {...renderProps} />
  );

  /*
    Inject app content into the HTML scaffold
  */
  const html = scaffold(
    {...renderProps, locals: res.locals},
    appContent
  );

  res
    .status(200)
    .send(html);
}

const isomorphicRenderer = routes => (req, res) => {
  match({
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res
        .status(500)
        .send(error.message);
    } else if (redirectLocation) {
      res
        .redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      renderPage(res, renderProps);
    } else {
      res.status(404).send('Not found');
    }
  })
};

export default isomorphicRenderer;
