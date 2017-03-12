import { createHistory, useBasename } from 'history';
import { render } from 'react-dom';
import { Router, match } from 'react-router';
import { routes } from '../routes.jsx';
import React from 'react';

// Run our app under the /base URL.
const history = useBasename(createHistory)({
  basename: window.__locals__.stageContext.pathPrefix
});

import 'Stylesheets/main';

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    React.createElement(Router, {...renderProps}),
    document.getElementById('app-content')
  )
})
