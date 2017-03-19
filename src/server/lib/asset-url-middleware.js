import path from 'path';

export default (req, res, next) => {
  const assetBase = res.locals.stageContext.assetBase;
  res.locals.assetUrl = assetPath => path.join('/', assetBase, assetPath);

  const resourceBase = res.locals.stageContext.resourceBase;
  res.locals.resourceUrl = resourcePath => path.join('/', resourceBase, resourcePath);

  next();
}
