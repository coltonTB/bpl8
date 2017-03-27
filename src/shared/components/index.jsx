import {Link} from 'react-router';
import React from 'react';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';

export const App = props => (
  <StyletronProvider styletron={global.styletron}>
    <div>
      <h1>Hello!</h1>
      {props.children}
    </div>
  </StyletronProvider>
);

export const Welcome = () => (
  <div>
    Welcome!!
    <Link to="/dashboard">Dash</Link>
  </div>
);

export const Dashboard = (props, context) => (
  <div>
    Cool Dashboard
    <Link to="/">Home</Link>
    <div>
      { context.localContext.assetUrl('test.jpg') }
    </div>
  </div>
);

Dashboard.contextTypes = {
  localContext: React.PropTypes.object
}
