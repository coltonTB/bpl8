import React from 'react';

const Scaffold = props => (
  <html lang="en">
    <head>
      {
        props.locals.renderHeader()
      }
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `window.__locals__=${JSON.stringify(props.locals)}`
      }}/>
    </head>
    <body>
      <div id="app-content" dangerouslySetInnerHTML={{ __html: props.appContent}} />
      <script src={props.locals.assetUrl("assets/browser-bundle.js")} />
    </body>
  </html>
);

export default Scaffold;
