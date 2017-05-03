import React from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg'

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Input, Img, H2, P, Div, Button } from '../style/util';
import { Hideable } from '../style/hideable';

import { CenterNavBackground, CenterNav } from './center-nav';
import { Content, ContentLeft } from '../style/content-column';

const FooterContainer = styled(FlexContainer)`
  padding-top: 40px;
  padding-bottom: 60px;
  background: ${ COLORS.black }
`;
const SubscribeInputStyle = styled.span`
  display: flex;
  > button {
    margin-left: 5%;
    padding: 6px 16px;
  }
  .right-arrow-svg {
    width: 30px;
    stroke: ${ COLORS.white }
  }
`;
const Contact = styled.p`
  margin-top: 40px;
`;
const SocialLinks = styled.img`
  margin-top: 15px;
  height: 36px;
`;
const Brand = styled.p`
  margin-top: 110px;
`;

const SubscribeInput = (props, {localContext}) => (
  <SubscribeInputStyle display="flex">
    <Input placeholder={ localContext.getContent('footer', 'subscribe_prompt') } />
    <Button>
      <ReactSVG
        path={ localContext.assetUrl('/images/right_arrow.svg') }
        className="right-arrow-svg"
      />
    </Button>
  </SubscribeInputStyle>
)

export const isAtPageBottom = () => {
  const scrollBottom = window.scrollY + window.innerHeight;
  return scrollBottom > document.body.scrollHeight - 20;
}

const Footer = (props, { localContext }) => (
  <FooterContainer>
    <ContentLeft align="flex-start">
      <div>
        <H2 color={ COLORS.gold }>
          { localContext.getContent('footer', 'contact') }
        </H2>
        <SocialLinks src={ localContext.assetUrl('/images/social_shim.png') } />
        <Brand>
          { localContext.getContent('footer', 'brand') }
        </Brand>
      </div>
    </ContentLeft>

    <CenterNavBackground />

    <Content align="flex-start">
      <div>
        <SubscribeInput />
        <Contact>
          { localContext.getContent('footer', 'tom_contact') }
        </Contact>
        <Contact>
          { localContext.getContent('footer', 'rad_contact') }
        </Contact>
      </div>
    </Content>
  </FooterContainer>
);

Footer.contextTypes = SubscribeInput.contextTypes = {
  localContext: React.PropTypes.object
};

export { Footer };
