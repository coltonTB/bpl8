import path from 'path';

const stageContext = window.__locals__.stageContext;

export const locals = {
  assetUrl(assetPath) {
    return path.join('/', stageContext.assetBase, assetPath)
  },
  resourceUrl(resourcePath) {
    return path.join('/', stageContext.resourceBase, resourcePath)
  },
  stageContext
}
