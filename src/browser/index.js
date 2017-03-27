import { createHistory, useBasename } from 'history';
import { render } from 'react-dom';
import { Router, match } from 'react-router';
import { StyletronProvider } from 'styletron-react';
import Styletron from 'styletron-client'
import React from 'react';

import { routes } from '../shared/routes.jsx';
import getLocalContext from '../../lib/get-local-context';
import withLocalContext from '../../lib/with-local-context';

import 'Stylesheets/main';

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

const styleElements = document.getElementsByClassName('_styletron_hydrate_');
const styletron = global.styletron = new Styletron(styleElements);

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    React.createElement(RouterWithLocalContext, {...renderProps}),
    document.getElementById('app-content')
  )
});
