import path from 'path';

const getLocalContext = ({stageContext}) => ({
  assetUrl(assetPath) {
    return path.join('/', stageContext.assetBase, assetPath)
  },
  resourceUrl(resourcePath) {
    return path.join('/', stageContext.resourceBase, resourcePath)
  },
  stageContext
});

export default getLocalContext;
