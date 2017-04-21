const defaultStageContext = {
  stage: 'local',
  resourceBase: '',
  assetBase: ''
};

/*
  Extract stage variables from API gateway
*/
function getStageContext(req) {
  let stageContext;
  const apiGatewayEventHeader = req.headers['x-apigateway-event']
  if (apiGatewayEventHeader) {
    try {
      stageContext = JSON.parse(apiGatewayEventHeader).stageVariables;
    } catch (e) {}
  }
  return stageContext || defaultStageContext;
}

export default getStageContext;
