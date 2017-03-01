const defaultContext = {
  stage: 'local',
  pathPrefix: ''
};

export default (req, res, next) => {

  let stageContext = defaultContext;
  const apiGatewayEventHeader = req.headers['x-apigateway-event']
  if (apiGatewayEventHeader) {
    try {
      stageContext = JSON.parse(apiGatewayEventHeader).stageVariables;
    } catch (e) {}
  }

  res.locals = {stageContext};

  next();
}
