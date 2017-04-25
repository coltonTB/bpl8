import { getContent } from './content-manager';

const getLocalContext = ({stageContext, content}) => ({
  assetUrl(assetPath) {
    return [stageContext.assetBase, assetPath].join('')
  },
  resourceUrl(resourcePath) {
    return [stageContext.resourceBase, resourcePath].join('')
  },
  getContent(namespace, key) {
    return getContent(content, namespace, key);
  },
  stageContext,
  content
});

export default getLocalContext;
