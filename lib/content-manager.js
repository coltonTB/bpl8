import React from 'react';

import * as content from '../content.json';

export function getContent(stageContext, namespace, key) {
  const item = content[namespace] ? content[namespace][key] : null;
  if ( typeof item === 'string' && item.search('\n') > 0) {
    /*
      Replace newline with <br/>
    */
    return item.split('\n').map((item, i) => (
      <span key={i}>{item}<br/></span>
    ));
  }
  return item;
}
