import React from 'react';

/*
  Replace newline with <br/>
*/
const breakNewlines = item => {
  if (typeof item === 'string' && item.search('\n') > 0) {
    return item.split('\n').map((item, i) => (
      <span key={i}>{item}<br/></span>
    ));
  }
  return item;
}

export function getContent(content, namespace, key) {
  const item = content[namespace] ? content[namespace][key] : null;
  return breakNewlines(item);
}
