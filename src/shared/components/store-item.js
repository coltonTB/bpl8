import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexItem } from '../style/flexbox';
import { Span, P, Button } from '../style/util'

const StoreItemWrapper = styled(FlexItem)`
  flex-direction: column;
  flex: 1 1 auto;
  padding-bottom: 80px;
`;

const StoreItemImg = styled.img`
  width: 100%;
`;

const StoreItemCaption = styled.div`
  text-align: left;
  color: ${ COLORS.white };
  font-weight: bold;
  margin-top: 20px;
`;

const BuyButton = styled(Button)`
  background: ${ COLORS.black };
  font-size: 1.8rem;
  width: 260px;
`;

const StoreItem = ({ data }, { localContext }) => (
  <StoreItemWrapper>
    <StoreItemImg src={ localContext.assetUrl(data.img) }/>
    <StoreItemCaption>
      <h3>
        <Span textTransform="capitalize" color={ COLORS.black }>
            { data.title },&nbsp;
        </Span>
        <Span textTransform="capitalize" color={ COLORS.white }>
            { data.title_2 }&nbsp;
        </Span>
        <Span color={ COLORS.white }>
          &mdash;&nbsp;${ data.price }
        </Span>
      </h3>
      <P color={ COLORS.black } fontSize="1em">
        { data.printInfo }
        <br/>
        { data.fgm }
      </P>
    </StoreItemCaption>
    <BuyButton>
      { localContext.getContent('shop', 'buy_btn') }
    </BuyButton>
  </StoreItemWrapper>
)

StoreItem.contextTypes =  {
  localContext: React.PropTypes.object
};

export { StoreItem };
