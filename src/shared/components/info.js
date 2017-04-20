import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H2, H5, Img, P } from '../style/util'
import { Hideable } from '../style/hideable';

import { HeroTextLeft, HeroText } from './hero-text';
import { CenterNav, CenterNavBackground } from './center-nav';
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
    <Div background={COLORS.white}>

      <CenterNav color={ COLORS.gold }/>

      <FlexContainer>
        <InfoLeft align="flex-start">
          <H2 color={ COLORS.black }>
            { content('title') }
          </H2>
        </InfoLeft>
        <CenterNavBackground />
        <InfoRight>
          <H5 color={ COLORS.gold }>
            { content('subtitle') }
          </H5>
        </InfoRight>
      </FlexContainer>

      <Div padding="60px 0">

        <Hideable hideInitially isVisible>
          <FlexContainer>
            <InfoLeft align="flex-start" color={ COLORS.black }>
              <h3>
                { content('mission_title') }
              </h3>
              <p>
                { content('mission_text') }
              </p>
            </InfoLeft>
            <CenterNavBackground />
            <InfoRight color={ COLORS.gold }>
              <div>
                <Image src={ localContext.assetUrl(content('gallery_img')) } />
              </div>
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
              <div>
                <Image src={ localContext.assetUrl(content('tom_img')) } />
              </div>
              <Div fontWeight="bold" textAlign="center">
                  { content('tom_img_title') }
              </Div>
              <Div textAlign="center">
                  { content('tom_img_caption') }
              </Div>
            </InfoLeft>
            <CenterNavBackground />
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
            <CenterNavBackground />
            <InfoRight color={ COLORS.gold }>
              { content('partners_list').map(Collaborator) }
            </InfoRight>
          </FlexContainer>

        </Hideable>
      </Div>

      <Footer />

    </Div>
  );
}

Info.contextTypes = {
  localContext: React.PropTypes.object
};

export default Info;
