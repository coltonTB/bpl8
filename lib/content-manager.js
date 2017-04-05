import React from 'react';

import * as content from '../content.json';

export function getContent(stageContext, namespace, key) {
  const string = content[namespace] ? content[namespace][key] : null;
  if (string && string.search('\n') > 0) {
    /*
      Replace newline with <br/>
    */
    return string.split('\n').map((item, i) => (
      <span key={i}>{item}<br/></span>
    ));
  }
  return string;
}
