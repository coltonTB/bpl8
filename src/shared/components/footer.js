import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Input, Img, H2, P, Div, Button } from '../style/util';
import { Hideable } from '../style/hideable';

import { CenterNavBackground, CenterNav } from './center-nav';
import { Content, ContentLeft } from '../style/content-column';
import { SubscribeInput } from './subscribe-input';

const footerContentStyle = `
  padding-bottom: 0;
  padding-top: 0;
  @media (max-width: 500px) {
    align-self: flex-start;
    text-align: left;
  }
`;
const FooterContent = styled(Content)`${footerContentStyle}`
const FooterContentLeft = styled(ContentLeft)`${footerContentStyle}`
const FooterContainer = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 3.75rem;
  background: ${ COLORS.black };
  @media (max-width: 500px) {
    padding-top: 6rem;
  }
`;
const FlexContainerCenterSmall = FlexContainer.extend`
  @media (max-width: 500px) {
    > div {
      align-self: center;
    }
  }
`;

const SocialLinks = styled.img`
  margin-top: 1rem;
  height: 3rem;
  @media (max-width: 500px) {
    height: 5rem;
  }
`;
const Brand = styled.p`
  margin-top: 5.8rem;
  @media (max-width: 500px) {
    margin-top: 2rem;
  }
`;

export const isAtPageBottom = () => {
  const scrollBottom = window.scrollY + window.innerHeight;
  return scrollBottom > document.body.scrollHeight - 20;
}

const Footer = (props, { localContext }) => (
  <FooterContainer>

    <FlexContainerCenterSmall>
      <FooterContentLeft align="flex-start" paddingBottom="0">
        <H2 color={ COLORS.gold }>
          { localContext.getContent('footer', 'contact') }
        </H2>
      </FooterContentLeft>
      <CenterNavBackground />
      <FooterContent paddingBottom="0">
        <SubscribeInput />
      </FooterContent>
    </FlexContainerCenterSmall>

    <FlexContainer>
      <FooterContentLeft>
        <div>
          <SocialLinks src={ localContext.assetUrl('/images/social_shim.png') } />
          <Brand>
            { localContext.getContent('footer', 'brand') }
          </Brand>
        </div>
      </FooterContentLeft>
      <CenterNavBackground />
      <FooterContent align="flex-start">
        <div>
          <P marginTop="1rem">
            { localContext.getContent('footer', 'tom_contact') }
          </P>
          <P marginTop="2.5rem">
            { localContext.getContent('footer', 'rad_contact') }
          </P>
        </div>
      </FooterContent>
    </FlexContainer>

  </FooterContainer>
);

Footer.contextTypes = {
  localContext: React.PropTypes.object
};

export { Footer };
