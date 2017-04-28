import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H5 } from '../style/util';
import { Hideable } from '../style/hideable';

import { Content, ContentLeft } from '../style/content-column';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer } from './footer'
import { StoreItem } from './store-item';

const ImagesLeft = styled(ContentLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
`;
const ImagesRight = styled(Content)`
  flex-wrap: nowrap;
  flex-direction: column;
`;

const StoreItemContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-wrap: nowrap;
  max-width: 1300px;
  margin-bottom: 80px;
`;

const Shop = (props, { localContext }) => {
  const content = key => localContext.getContent('shop', key);

  return (
    <Div background={COLORS.gold}>

      <CenterNav fixed/>

      <FlexContainer>
        <ContentLeft align="flex-start">
          <h2>
            { content('title') }
          </h2>
        </ContentLeft>
        <CenterNavBackground />
        <Content color={ COLORS.gold }>
          <H5 color={ COLORS.black }>
            { content('subtitle') }
          </H5>
        </Content>
      </FlexContainer>

      <FlexContainer>
        <Hideable hideInitially isVisible>
          <StoreItemContainer>
            <ImagesLeft align="flex-start" width="500px">
              <StoreItem data={ content('items')[0] } />
              <StoreItem data={ content('items')[2] } />
            </ImagesLeft>
            <CenterNavBackground />
            <ImagesRight color={ COLORS.gold } align="flex-start" width="500px">
              <StoreItem data={ content('items')[1] } />
              <StoreItem data={ content('items')[3] } />
              <StoreItem data={ content('items')[4] } />
            </ImagesRight>
          </StoreItemContainer>
        </Hideable>
      </FlexContainer>

      <Footer />

    </Div>
  );
}

Shop.contextTypes = {
  localContext: React.PropTypes.object
};

export default Shop;
