import { createHistory, useBasename } from 'history';
import { render } from 'react-dom';
import { Router, match } from 'react-router';
import React from 'react';

import { onMessage, sendMessage } from '../admin/admin-page-bridge';
import { routes } from '../shared/routes.jsx';
import getLocalContext from '../../lib/get-local-context';
import withLocalContext from '../../lib/with-local-context';
import { preload } from './image-preloader';
import grain from './grain';

import 'Stylesheets/main';

window.addEventListener('message', onMessage((message) => {
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

  grain(window, window.document);
  grained('#app-content', {
    animate: true,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: .05,
    grainDensity: 1,
    grainWidth: 1,
    grainHeight: 1
  });
}

renderPage();
