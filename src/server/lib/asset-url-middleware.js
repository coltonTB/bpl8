import path from 'path';

export default (req, res, next) => {
  const assetBase = res.locals.stageContext.pathPrefix;
  res.locals.assetUrl = assetPath => path.join('/', assetBase, assetPath);
  next();
}
