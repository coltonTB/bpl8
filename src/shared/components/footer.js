import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Input, Img, H2, Div } from '../style/util';
import { Hideable } from '../style/hideable';

import { CenterNavBackground, CenterNav } from './center-nav';
import { HeroText, HeroTextLeft } from '../style/hero-text';

const FooterContainer = styled(FlexContainer)`
  padding-top: 40px;
  padding-bottom: 60px;
  background: ${ COLORS.black }
`;

export const isAtPageBottom = () => {
  const scrollBottom = window.scrollY + window.innerHeight;
  return scrollBottom > document.body.scrollHeight - 20;
}

const Footer = (props, { localContext }) => (
  <FooterContainer>
    <HeroTextLeft align="flex-start">
      <div>
        <H2 color={ COLORS.gold } marginBottom="15px" >
          { localContext.getContent('footer', 'contact') }
        </H2>
        <Img src={ localContext.assetUrl('/images/social_shim.png') } height="36px" />
        <Div marginTop="46px">
          { localContext.getContent('footer', 'brand') }
        </Div>
      </div>
    </HeroTextLeft>

    <CenterNavBackground />

    <HeroText align="flex-start">
      <div>
        <Input placeholder={ localContext.getContent('footer', 'subscribe_prompt') } />
        <Div marginTop="30px">
          { localContext.getContent('footer', 'tom_contact') }
        </Div>
        <Div marginTop="30px">
          { localContext.getContent('footer', 'rad_contact') }
        </Div>
      </div>
    </HeroText>
  </FooterContainer>
);

Footer.contextTypes = {
  localContext: React.PropTypes.object
};

export { Footer };
