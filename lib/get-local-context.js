const getLocalContext = ({stageContext}) => ({
  assetUrl(assetPath) {
    return [stageContext.assetBase, assetPath].join('')
  },
  resourceUrl(resourcePath) {
    return [stageContext.resourceBase, resourcePath].join('')
  },
  stageContext
});

export default getLocalContext;
