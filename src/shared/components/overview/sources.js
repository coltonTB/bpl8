import React from 'react';

import { Img, Div } from '../../style/util';

const getSource = (sourceLinkId, localContext, prop) => {
  return localContext.getContent('overview', `sourceLinks.${sourceLinkId - 1}.${prop}`) || '';
};

export const SourceRight = (props, {localContext}) => (
  <div>
    <h3>
      { getSource(props.selectedSourceLink, localContext, 'title') }
    </h3>
    <p dangerouslySetInnerHTML={{
      __html: getSource(props.selectedSourceLink, localContext, 'rightBody')
    }} />
  </div>
);

export const SourceLeft = (props, {localContext}) => {
  const source = getSource(props.selectedSourceLink, localContext);
  return (
    <div>
      { getSource(props.selectedSourceLink, localContext, 'image_1_src') && (
        <div>
          <Img width="100%" src={
            localContext.assetUrl(
              getSource(props.selectedSourceLink, localContext, 'image_1_src')
            )}
          />
          <Div textAlign="center" color="black" margin="14px 0 60px 0">
            { getSource(props.selectedSourceLink, localContext, 'image_1_caption') }
          </Div>
        </div>
      )}
      { getSource(props.selectedSourceLink, localContext, 'image_2_src') && (
        <div>
          <Img width="100%" src={
            localContext.assetUrl(
              getSource(props.selectedSourceLink, localContext, 'image_2_src')
            )}
          />
          <Div textAlign="center" color="black" margin="14px 0 60px 0">
            { getSource(props.selectedSourceLink, localContext, 'image_2_caption') }
          </Div>
        </div>
      )}
    </div>
  )
};

SourceLeft.contextTypes = SourceRight.contextTypes = {
  localContext: React.PropTypes.object
};
