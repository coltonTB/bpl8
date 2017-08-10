import { getContent } from './content-manager';

const getLocalContext = ({stageContext, content}) => ({
  assetUrl(assetPath) {
    // Recognize image path objects in content.json
    const path = assetPath && assetPath.src ? assetPath.src : assetPath;
    return [stageContext.assetBase, path].join('');
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
