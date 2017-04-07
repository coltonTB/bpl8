import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Input, Img, H2, Div } from '../style/util';

import { CenterNavPlaceholder } from './center-nav';
import { HeroText, HeroTextLeft } from './hero-text';

const FooterContainer = styled(FlexContainer)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Footer = (props, { localContext }) => (
  <FooterContainer>
    <HeroTextLeft align="flex-start">
      <div>
        <H2 color={ COLORS.gold } marginBottom="15px" >
          { localContext.content('footer', 'contact') }
        </H2>
        <Img src={ localContext.assetUrl('/images/social_shim.png') } height="36px" />
        <Div marginTop="92px">
          { localContext.content('footer', 'brand') }
        </Div>
      </div>
    </HeroTextLeft>
    <CenterNavPlaceholder />
    <HeroText align="flex-start">
      <div>
        <Input placeholder={ localContext.content('footer', 'subscribe_prompt') } />
        <Div marginTop="30px">
          { localContext.content('footer', 'tom_contact') }
        </Div>
        <Div marginTop="30px">
          { localContext.content('footer', 'rad_contact') }
        </Div>
      </div>
    </HeroText>
  </FooterContainer>
);

Footer.contextTypes = {
  localContext: React.PropTypes.object
};

export { Footer };
