import { createHistory, useBasename } from 'history';
import { render } from 'react-dom';
import { Router, match } from 'react-router';
import React from 'react';

import { onMessage, sendMessage } from '../admin/admin-page-bridge';
import { routes } from '../shared/routes.jsx';
import getLocalContext from '../../lib/get-local-context';
import withLocalContext from '../../lib/with-local-context';
import { preload } from './image-preloader';

import 'Stylesheets/main';

window.addEventListener('message', onMessage(() => {
  window.__locals__.content = message.content;
  renderPage();
}));

function renderPage() {

  const localContext = getLocalContext({
    stageContext: window.__locals__.stageContext,
    content: window.__locals__.content
  });

  preload({localContext, imageUrls: window.__locals__.imageUrls});

  const history = useBasename(createHistory)({
    basename: localContext.stageContext.resourceBase
  });

  history.listen(sendMessage);

  const RouterWithLocalContext = withLocalContext(
    Router,
    localContext
  );

  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(
      React.createElement(RouterWithLocalContext, {...renderProps}),
      document.getElementById('app-content')
    )
  });
}

renderPage();
