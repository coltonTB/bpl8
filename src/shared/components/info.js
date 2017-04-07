import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H2, H5, Img, P } from '../style/util'

import { HeroTextLeft, HeroText } from './hero-text';
import { CenterNav, CenterNavList, CenterNavPlaceholder } from './center-nav';
import { Footer } from './footer'

const InfoLeft = styled(HeroTextLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 500px;
  margin-bottom: 60px;
`;
const InfoRight = styled(HeroText)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 500px;
  margin-bottom: 60px;
`;
const Image = styled(Img)`
  width: 100%;
  margin-bottom: 20px;
`;

const Collaborator = (item, i) => (
  <div key={i}>
    <h3>{ item.name }</h3>
    <P margin="0 0 12px 0">{ item.description }</P>
  </div>
);

const Info = (props, { localContext }) => {
  const content = key => localContext.content('info', key);

  return (
    <Div background={COLORS.white} paddingTop="20px">

      <CenterNav>
        <CenterNavList color={ COLORS.gold }/>
      </CenterNav>

      <FlexContainer>
        <InfoLeft align="flex-start">
          <H2 color={ COLORS.black }>
            { content('title') }
          </H2>
        </InfoLeft>
        <CenterNavPlaceholder />
        <InfoRight>
          <H5 color={ COLORS.gold }>
            { content('subtitle') }
          </H5>
        </InfoRight>
      </FlexContainer>

      <Div padding="60px 0">

        <FlexContainer>
          <InfoLeft align="flex-start" color={ COLORS.black }>
            <h3>
              { content('mission_title') }
            </h3>
            <p>
              { content('mission_text') }
            </p>
          </InfoLeft>
          <CenterNavPlaceholder />
          <InfoRight color={ COLORS.gold }>
            <Image src={ content('gallery_img') } />
            <Div fontWeight="bold" textAlign="center">
                { content('gallery_img_title') }
            </Div>
            <Div textAlign="center">
                { content('gallery_img_caption') }
            </Div>
          </InfoRight>
        </FlexContainer>

        <FlexContainer>
          <InfoLeft color={ COLORS.gold }>
            <Image src={ content('tom_img') } />
            <Div fontWeight="bold" textAlign="center">
                { content('tom_img_title') }
            </Div>
            <Div textAlign="center">
                { content('tom_img_caption') }
            </Div>
          </InfoLeft>
          <CenterNavPlaceholder />
          <InfoRight align="flex-start" color={ COLORS.black }>
            <h3>
              { content('tom_title') }
            </h3>
            <p>
              { content('tom_text') }
            </p>
          </InfoRight>
        </FlexContainer>

        <FlexContainer>
          <InfoLeft align="flex-start" color={ COLORS.black }>
            <h2>
              { content('partners_title') }
            </h2>
          </InfoLeft>
          <CenterNavPlaceholder />
          <InfoRight color={ COLORS.gold }>
            { content('partners_list').map(Collaborator) }
          </InfoRight>
        </FlexContainer>

      </Div>

      <Footer />

    </Div>
  );
}

Info.contextTypes = {
  localContext: React.PropTypes.object
};

export default Info;
