import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {App, Welcome, Dashboard} from './components/index'

export const routes = (
  <Route path="/" component={App}/>
);
