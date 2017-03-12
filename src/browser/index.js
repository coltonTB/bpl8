import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router'
import { routes } from '../routes.jsx';

import 'Stylesheets/main';

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
  render(
    React.createElement(Router, {...renderProps}),
    document.getElementById('app-content')
  )
})
