import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Index from './components/index'
import Home from './components/home';
import Overview from './components/overview';
import Shop from './components/shop';
import Info from './components/info';

export const routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="/overview" component={Overview}/>
    <Route path="/shop" component={Shop}/>
    <Route path="/info" component={Info}/>
  </Route>
);
