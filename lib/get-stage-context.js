const defaultStageContext = {
  stage: 'local',
  resourceBase: '',
  assetBase: ''
};

const staticSiteContext = {
  stage: 'static',
  resourceBase: 'file:///Users/colton/Dev/repos/radical-machines/dist/static-site/',
  assetBase: 'file:///Users/colton/Dev/repos/radical-machines/dist'
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
  } else if (req.headers['x-static-generator']) {
    stageContext = staticSiteContext;
  }
  return stageContext || defaultStageContext;
}

export default getStageContext;
