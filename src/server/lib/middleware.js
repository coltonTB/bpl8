import path from 'path';

const defaultContext = {
  stage: 'local',
  resourceBase: '',
  assetBase: ''
};

export const contextMiddleware = (req, res, next) => {
  let stageContext;
  const apiGatewayEventHeader = req.headers['x-apigateway-event']
  if (apiGatewayEventHeader) {
    try {
      stageContext = JSON.parse(apiGatewayEventHeader).stageVariables;
    } catch (e) {}
  }
  res.locals.stageContext = stageContext || defaultContext;
  next();
}

export const urlHelperMiddleware = (req, res, next) => {
  const assetBase = res.locals.stageContext.assetBase;
  const resourceBase = res.locals.stageContext.resourceBase;

  res.locals.assetUrl = assetPath => path.join('/', assetBase, assetPath)
  res.locals.resourceUrl = resourcePath => path.join('/', resourceBase, resourcePath)

  next();
}
