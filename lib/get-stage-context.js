const localStageContext = {
  stage: 'local',
  resourceBase: '',
  assetBase: '',
  gaId: '',
  faviconUrl: ''
};

const prodStageContext = {
  stage: 'prod',
  resourceBase: '',
  assetBase: '',
  gaId: '',
  faviconUrl: ''
};

/*
  Extract stage variables from API gateway
*/
function getStageContext(req) {
  const NODE_ENV = process.env.node_env;
  if (NODE_ENV === 'dev') {
    return localStageContext;
  } else if (NODE_ENV === 'prod') {
    return prodStageContext;
  }
  throw "Please set node_env";
}

export default getStageContext;
