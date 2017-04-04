import { getContent } from './content-manager';

const getLocalContext = ({stageContext}) => ({
  assetUrl(assetPath) {
    return [stageContext.assetBase, assetPath].join('')
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
