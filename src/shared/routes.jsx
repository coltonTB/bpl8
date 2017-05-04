import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Index from './components/index'
import Home from './components/home';
import Overview from './components/overview/overview.js';
import Shop from './components/shop';
import Info from './components/info';
import Calendar from './components/calendar';
import background from './components/background';

export const routes = (
  <Route path="" component={Index}>
    <Route path="/" component={Home}/>
    <Route path="/overview" component={Overview}/>
    <Route path="/book" component={Shop}/>
    <Route path="/info" component={Info}/>
    <Route path="/calendar" component={Calendar}/>
    <Route path="/background" component={background}/>
  </Route>
);
