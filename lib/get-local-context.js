import { getContent } from './content-manager';

import pkgjson from '../package.json';

const getLocalContext = ({stageContext}) => ({
  assetUrl(assetPath) {
    const version = stageContext.stage === 'local' ? '' : `${pkgjson.version}/`;
    return [stageContext.assetBase, version, assetPath].join('');
  },
  resourceUrl(resourcePath) {
    return [stageContext.resourceBase, resourcePath].join('')
  },
  stageContext,
  content(namespace, key) {
    return getContent(stageContext, namespace, key);
  }
});

export default getLocalContext;
