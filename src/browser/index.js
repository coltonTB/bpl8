import { createHistory, useBasename } from 'history';
import { render } from 'react-dom';
import { Router, match } from 'react-router';
import React from 'react';

import {locals} from './helpers';
import { routes } from '../routes.jsx';
import withLocalContext from '../server/lib/with-local-context';

import 'Stylesheets/main';

// Run our app under the /base URL.
const history = useBasename(createHistory)({
  basename: window.__locals__.stageContext.resourceBase
});

const RouterWithLocalContext = withLocalContext(
  Router,
  {locals}
);

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    React.createElement(RouterWithLocalContext, {...renderProps}),
    document.getElementById('app-content')
  )
})
