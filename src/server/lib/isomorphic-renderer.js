import React from 'react';
import Scaffold from './scaffold.js';
import { match, RouterContext } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

const renderPage = (res, renderProps) => {
  // Hijack createHref function to account for assetUrl
  // modifying anchor tags
  const oldCreateHref = renderProps.router.createHref;
  renderProps.router.createHref = path =>
    res.locals.resourceUrl(oldCreateHref(path))

  const appContent = renderToString(
    <RouterContext {...renderProps}/>
  );
  const html = renderToStaticMarkup(
    <Scaffold appContent={appContent} locals={res.locals}/>
  );

  res
    .status(200)
    .send(html);
}

const isomorphicRenderer = routes => (req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
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
