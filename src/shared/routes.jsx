import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Index from './components/index'
import Home from './components/home';

export const routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
  </Route>
);
