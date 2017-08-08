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

const bgStyle = `
  flex-wrap: nowrap;
  flex-direction: column;
  width: 31.25rem;
  margin-bottom: 1.25rem;
  align-self: flex-start;
  @media (max-width: 500px) {
    width: 100vw;
    box-sizing: border-box;
  }
`;
const BackgroundLeft = styled(ContentLeft)`${ bgStyle }`;
const BackgroundRight = styled(Content)`${ bgStyle }`;
const Image = styled(Img)`
  width: 100%;
`;
const HeadingContainer = styled(FlexContainer)`
  background: ${ COLORS.gold };
  min-height: 17.5rem;
  @media (max-width: 1000px) {
    min-height: 19rem;
  }
`;
const Question = props => (
  <H3 marginBottom="0.625rem">
    <Span color={ COLORS.gold }>Q: </Span>
    <span>
      { props.children }
    </span>
  </H3>
);
const Quote = styled(H3)`
  text-align: center;
  font-weight: 500;
  padding: ${ props => props.padding || '0 3.4375rem' };
`;
const Provocation = styled(Div)`
  text-align: center;
  padding: 1.5rem 0;
  span {
    background: ${ COLORS.copper };
    color: ${ COLORS.white };
    text-transform: uppercase;
    padding: 0.375rem;
  }
`;
const Caption = styled.div`
  text-align: center;
  color: ${ COLORS.gold };
  padding: 0 2.25rem;
  margin: 1.5rem 0 2.625rem 0;
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

      <HeadingContainer>
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
      </HeadingContainer>

      <Hideable hideInitially isVisible>

        <FlexContainer paddingTop="3.125rem">
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

        <FlexContainer marginBottom="1.25rem">
          <BackgroundLeft align="flex-start" color={ COLORS.black } textAlign="center">
            <div>
              <Image src={ localContext.assetUrl('/images/bg_image_1.png') } />
            </div>
            <Provocation marginTop="1.875rem">
              <span>Provocation</span>
            </Provocation>
            <Quote>
              "{ content('section_1_quote') }"
            </Quote>
            <H5
              className="nopad"
              color={ COLORS.gold }
              textAlign="center"
              padding="2.5rem 1.25rem 3.75rem 1.25rem"
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

        <FlexContainer marginBottom="7.5rem">
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
            <Div marginTop="1.25rem">
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
            <Quote color={ COLORS.gold } padding="1.25rem 2.5rem 1.25rem">
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
