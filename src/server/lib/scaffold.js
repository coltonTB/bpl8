import React from 'react';

const Scaffold = props => (
  <html lang="en">
    <head>
      {props.context.header.render()}
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `window.__context=${JSON.stringify(props.context)}`
      }}/>
    </head>
    <body>
      <div id="app-content" dangerouslySetInnerHTML={{ __html: props.appContent}} />
      <script src="assets/bundle.js" />
    </body>
  </html>
);

export default Scaffold;
