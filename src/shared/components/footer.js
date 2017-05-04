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
  padding-top: 2.5rem;
  padding-bottom: 3.75rem;
  background: ${ COLORS.black }
`;
const SubscribeInputStyle = styled.span`
  display: flex;
  > button {
    margin-left: 5%;
    padding: 0.375rem 1rem;
  }
  .right-arrow-svg {
    width: 1.875rem;
    stroke: ${ COLORS.white }
  }
`;
const Contact = styled.p`
  margin-top: 2.5rem;
`;
const SocialLinks = styled.img`
  margin-top: 1rem;
  height: 2.25rem;
`;
const Brand = styled.p`
  margin-top: 6.55rem;
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
