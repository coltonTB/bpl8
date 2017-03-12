import React from 'react';
import Scaffold from './scaffold.js';
import { routes } from '../../routes';
import { match, RouterContext } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

const isomorphicRenderer = (req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const appContent = renderToString(
        <RouterContext {...renderProps}/>
      );
      res.status(200).send(renderToStaticMarkup(
        <Scaffold appContent={appContent} locals={res.locals}/>
      ));
    } else {
      res.status(404).send('Not found');
    }
  })
};

export default isomorphicRenderer;
