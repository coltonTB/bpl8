import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H2, H3, H4, H5, Img, P, Span } from '../style/util'
import { Hideable } from '../style/hideable';

import { ContentLeft, Content } from '../style/content-column';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer } from './footer'

const TOP_SECTION_HEIGHT = 270;
const isBelowTopSection = () => window.scrollY > TOP_SECTION_HEIGHT;

const BackgroundLeft = styled(ContentLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 500px;
  margin-bottom: 20px;
  align-self: flex-start;
`;
const BackgroundRight = styled(Content)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 500px;
  margin-bottom: 20px;
  align-self: flex-start;
`;
const Image = styled(Img)`
  width: 100%;
`;
const Question = props => (
  <H3 marginBottom="10px">
    <Span color={ COLORS.gold }>Q: </Span>
    <span>
      { props.children }
    </span>
  </H3>
);
const Quote = styled(H3)`
  text-align: center;
  font-weight: 500;
  padding: ${ props => props.padding || '0 55px' };
`;
const Provocation = styled(Div)`
  text-align: center;
  padding: 24px 0;
  span {
    background: ${ COLORS.copper };
    color: ${ COLORS.white };
    text-transform: uppercase;
    padding: 5px;
  }
`;
const Caption = styled.div`
  text-align: center;
  color: ${ COLORS.gold };
  padding: 0 36px;
  margin: 24px 0 42px 0;
`;

const Background = (props, { localContext }) => {
  const content = key => localContext.getContent('background', key);

  return (
    <Div background={COLORS.white}>

      <Hideable isVisible={() => !isBelowTopSection() } listen>
        <CenterNav color={ COLORS.white } fixed />
      </Hideable>
      <Hideable isVisible={() => isBelowTopSection()} listen>
        <CenterNav color={ COLORS.gold } fixed isExpanded={false} />
      </Hideable>

      <FlexContainer background={ COLORS.gold } height={`${TOP_SECTION_HEIGHT}px`}>
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

        <FlexContainer paddingTop="50px">
          <ContentLeft align="flex-start" >
            <H2 color={ COLORS.black }>
              { content('section_1_title') }
            </H2>
          </ContentLeft>
          <CenterNavBackground />
          <Content>
            <H5 color={ COLORS.gold }>
              { content('section_1_subtitle') }
            </H5>
          </Content>
        </FlexContainer>

        <FlexContainer marginBottom="20px">
          <BackgroundLeft align="flex-start" color={ COLORS.black } textAlign="center">
            <div>
              <Image src={ localContext.assetUrl('/images/bg_image_1.png') } />
            </div>
            <Provocation marginTop="30px">
              <span>Provocation</span>
            </Provocation>
            <Quote>
              "{ content('section_1_quote') }"
            </Quote>
            <H5
              className="nopad"
              color={ COLORS.gold }
              textAlign="center"
              padding="40px 20px 60px 20px"
            >
              { content('section_1_highlight') }
            </H5>
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
            <Question>
              { content('section_1_question') }
            </Question>
            <p>
              { content('section_1_answer') }
            </p>
          </BackgroundRight>
        </FlexContainer>


        <FlexContainer>
          <ContentLeft align="flex-start" >
            <H2 color={ COLORS.black }>
              { content('section_2_title') }
            </H2>
          </ContentLeft>
          <CenterNavBackground />
          <Content>
            <H5 color={ COLORS.gold }>
              { content('section_2_subtitle') }
            </H5>
          </Content>
        </FlexContainer>

        <FlexContainer marginBottom="120px">
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
            <Div marginTop="20px">
              <Image src={ localContext.assetUrl('/images/bg_image_4.png') } />
            </Div>
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
            <Question>
              { content('section_1_question')}
            </Question>
            <p>
              { content('section_2_answer_1') }
            </p>
            <Quote color={ COLORS.gold } padding="20px 40px 20px">
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
