import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H2, H3, H4, H5, Img, P, Span } from '../style/util'
import { Hideable } from '../style/hideable';

import { HeroTextLeft, HeroText } from './hero-text';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer } from './footer'

const BackgroundLeft = styled(HeroTextLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 570px;
  margin-bottom: 20px;
  align-self: flex-start;
`;
const BackgroundRight = styled(HeroText)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 570px;
  margin-bottom: 20px;
  align-self: flex-start;
`;
const Image = styled(Img)`
  width: 100%;
`;
const Quote = styled(H3)`
  text-align: center;
  font-weight: 500;
  padding: ${ props => props.padding || '0 55px' };
`;
const Provocation = styled.div`
  text-align: center;
  padding: 24px 0;
  span {
    background: ${ COLORS.copper };
    color: ${ COLORS.white };
    text-transform: uppercase;
    padding: 5px;
  }
`;
const Caption = styled.p`
  text-align: center;
  color: ${ COLORS.gold };
  padding: 0 36px;
  margin: 24px 0 42px 0;
`;

const Background = (props, { localContext }) => {
  const content = key => localContext.content('background', key);

  return (
    <Div background={COLORS.white}>

      <CenterNav color={ COLORS.white } fixed />

      <FlexContainer background={ COLORS.gold } height="270px">
        <BackgroundLeft align="flex-start">
          <H2 color={ COLORS.white }>
            { content('title') }
          </H2>
        </BackgroundLeft>
        <CenterNavBackground />
        <BackgroundRight>
          <H5 color={ COLORS.black }>
            { content('subtitle') }
          </H5>
        </BackgroundRight>
      </FlexContainer>

      <Hideable hideInitially isVisible>

        <FlexContainer>
          <HeroTextLeft align="flex-start" >
            <H2 color={ COLORS.black }>
              { content('section_1_title') }
            </H2>
          </HeroTextLeft>
          <CenterNavBackground />
          <HeroText>
            <H5 color={ COLORS.gold }>
              { content('section_1_subtitle') }
            </H5>
          </HeroText>
        </FlexContainer>

        <FlexContainer>
          <BackgroundLeft align="flex-start" color={ COLORS.black } textAlign="center">
            <div>
              <Image src={ localContext.assetUrl('/images/bg_image_1.png') } />
            </div>
            <Provocation>
              <span>Provocation</span>
            </Provocation>
            <Quote>
              "{ content('section_1_quote') }"
            </Quote>
            <Caption>
              { content('section_1_highlight') }
            </Caption>
            <div>
              <Image src={ localContext.assetUrl('/images/bg_image_2.png') } />
            </div>
            <Caption>
              <strong>
                { content('section_1_img_2_title') }
              </strong>
              <br/>
              <span>
                { content('section_1_img_2_caption') }
              </span>
            </Caption>
          </BackgroundLeft>
          <CenterNavBackground />
          <BackgroundRight color={ COLORS.black }>
            <H3>
              <Span color={ COLORS.gold }>Q: </Span>
              <span>
                { content('section_1_question') }
              </span>
            </H3>
            <p>
              { content('section_1_answer') }
            </p>
          </BackgroundRight>
        </FlexContainer>


        <FlexContainer>
          <HeroTextLeft align="flex-start" >
            <H2 color={ COLORS.black }>
              { content('section_2_title') }
            </H2>
          </HeroTextLeft>
          <CenterNavBackground />
          <HeroText>
            <H5 color={ COLORS.gold }>
              { content('section_2_subtitle') }
            </H5>
          </HeroText>
        </FlexContainer>

        <FlexContainer>
          <BackgroundLeft align="flex-start" color={ COLORS.black } textAlign="center">
            <div>
              <Image src={ localContext.assetUrl('/images/bg_image_3.png') } />
            </div>
            <Caption>
              <strong>
                { content('section_2_img_1_title') }
              </strong>
              <br/>
              <span>
                { content('section_2_img_1_caption') }
              </span>
            </Caption>
            <div>
              <Image src={ localContext.assetUrl('/images/bg_image_4.png') } />
            </div>
            <Caption>
              <strong>
                { content('section_2_img_2_title') }
              </strong>
              <br/>
              <span>
                { content('section_2_img_2_caption') }
              </span>
            </Caption>
          </BackgroundLeft>
          <CenterNavBackground />
          <BackgroundRight color={ COLORS.black }>
            <H3>
              <Span color={ COLORS.gold }>Q: </Span>
              <span>
                { content('section_1_question') }
              </span>
            </H3>
            <p>
              { content('section_2_answer_1') }
            </p>
            <Quote color={ COLORS.gold } padding="50px 70px 20px">
              { content('section_2_quote') }
            </Quote>
            <p>
              { content('section_2_answer_2') }
            </p>
          </BackgroundRight>
        </FlexContainer>
      </Hideable>

      <Footer />

    </Div>
  );
}

Background.contextTypes = {
  localContext: React.PropTypes.object
};

export default Background;
