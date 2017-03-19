import React from 'react';
import {Link} from 'react-router';

import 'Stylesheets/center-nav';

const CenterNav = props => (
  <div className="rm--center-nav">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/info">Information</Link>
      </li>
      <li>
        <Link to="/calendar">Calendar</Link>
      </li>
      <li>
        <Link to="/background">Background</Link>
      </li>
      <li>
        <Link to="/overview">Overview</Link>
      </li>
      <li>
        <Link to="/shop">Gift Shop</Link>
      </li>
    </ul>
  </div>
);

export default CenterNav;
