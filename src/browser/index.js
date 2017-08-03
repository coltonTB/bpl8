import { createHistory, useBasename } from 'history';
import { render } from 'react-dom';
import { Router, match } from 'react-router';
import React from 'react';

import { routes } from '../shared/routes.jsx';
import getLocalContext from '../../lib/get-local-context';
import withLocalContext from '../../lib/with-local-context';
import scripts from './scripts';

import 'stylesheets/main';

const localContext = getLocalContext({
  stageContext: window.__locals__.stageContext
});

const history = useBasename(createHistory)({
  basename: localContext.stageContext.resourceBase
});

const RouterWithLocalContext = withLocalContext(
  Router,
  localContext
);

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    React.createElement(RouterWithLocalContext, {...renderProps}),
    document.getElementById('app-content')
  );
  scripts();
});
