import React from 'react';

const Scaffold = props => (
  <html>
    <head></head>
    <body>
      <div id="app-content" dangerouslySetInnerHTML={{ __html: props.appContent}} />
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `window.__context=${JSON.stringify(props.context)}`
      }}/>
      <script src="assets/bundle.js" />
    </body>
  </html>
);

export default Scaffold;
