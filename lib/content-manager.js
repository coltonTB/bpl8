import * as content from '../content.json';

export function getContent(stageContext, namespace, key) {
  return content[namespace] ? content[namespace][key] : null;
}
