import path from 'path';

let assetBase, resourceBase;

if (window && window.__locals__) {
  assetBase = window.__locals__.stageContext.assetBase;
  resourceBase = window.__locals__.stageContext.resourceBase;
} else {
  assetBase = resourceBase = '--notfound--';
}

export const assetUrl = assetPath => path.join('/', assetBase, assetPath)
export const resourceUrl = resourcePath => path.join('/', resourceBase, resourcePath)
