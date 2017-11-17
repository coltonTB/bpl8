import React from 'react';
import dotty from 'dotty';

import schema from '../content/content-schema.json';

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

/*
  Replace {{}}
 */
const addSourceLinks = item => {
  if (typeof item === 'string') {
    return item.replace(
      /\{\{([1-9]+)\}\}/g,
      '<a href="javascript:;" data-id="$1" class="source-link">$1</a>'
    );
  } else if (Array.isArray(item)) {
    return item.map(addSourceLinks);
  } else {
    return item;
  }
}


const interpretAsHtml = item => {
  if (typeof item === 'string') {
    return <span dangerouslySetInnerHTML={{ __html: item}} />
  } else if (Array.isArray(item)) {
    return item.map(interpretAsHtml);
  } else {
    return item;
  }
}

export function getContent(content, namespace, key, forceHTML) {
  const keyFormat = dotty.get(schema, `properties.${ namespace }.properties.${ key }.format`);
  let item = dotty.get(content, `${namespace}.${key}`);
  item = breakNewlines(item);
  item = addSourceLinks(item);
  if (keyFormat === 'textarea' || forceHTML) {
    item = interpretAsHtml(item);
  }
  return item;
}
