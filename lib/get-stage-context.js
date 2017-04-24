const localStageContext = {
  stage: 'local',
  resourceBase: '',
  assetBase: ''
};

const staticSiteContext = {
  stage: 'static',
  resourceBase: '',
  assetBase: 'http://dng0adgfomo9v.cloudfront.net'
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
  return stageContext || localStageContext;
}

export default getStageContext;
