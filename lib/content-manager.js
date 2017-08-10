import React from 'react';

/*
  Replace newline with <br/>
*/
const breakNewlines = item => {
  if (typeof item === 'string') {
    return item.replace(/\n/g, '<br />');
  } else if (Array.isArray(item)) {
    return item.map(breakNewlines);
  } else {
    return item;
  }
}

const interpretAsHtml = item => {
  // Don't interpret strings starting with raw:: as HTML
  if (/^raw\:\:/.test(item)) {
    return item.replace('raw::', '');
  } else if (typeof item === 'string') {
    return <span dangerouslySetInnerHTML={{ __html: item}} />
  } else if (Array.isArray(item)) {
    return item.map(interpretAsHtml);
  } else {
    return item;
  }
}

export function getContent(content, namespace, key) {
  let item = content[namespace] ? content[namespace][key] : null;
  item = breakNewlines(item);
  item = interpretAsHtml(item);
  return item;
}
