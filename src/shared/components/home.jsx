import ReactDOM from 'react-dom';
import React from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Button, Img, Div, H2, H3, H5 } from '../style/util';
import { Hideable } from '../style/hideable';
import { scrollLimit, scrollMin } from '../style/scroll-helpers';

import { CenterNav, CenterNavBackground, CenterNavMini } from './center-nav';
import { Content, ContentLeft } from '../style/content-column';
import { Footer, isAtPageBottom } from './footer';
import { ScrollPrompt } from './scroll-prompt';
import { HeroScroll } from './hero-scroll';

const IG_LINK = '';

const HeroH1 = styled.h1`
  font-size: 7.2vw;
  line-height: 7.2vw;
`;
const Hero2Caption = styled.h3`
  margin: 1rem 0 0.5rem 0;
`;
const Hero2Text = styled.p`
  margin-right: 18%;
  @media (max-width: 500px) {
    margin-right: 0;
    margin-bottom: 3rem;
  }
`;
const LargeImg = styled(Img)`
  width: 88%;
  max-width: 1200px;
  @media (max-width: 500px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;
const InstaWrapper = styled.div`
  width: 88%;
  max-width: 1200px;
  height: 400px;
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    overflow: hidden;
  }
  @media (max-width: 1100px) {
    height: 350px;
  }
  @media (max-width: 1000px) {
    height: 300px;
  }
  @media (max-width: 900px) {
    height: 250px;
  }
  @media (max-width: 700px) {
    height: 200px;
  }
  @media (max-width: 500px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;
const SectionSub = styled(H5)`
  padding-right: 20%;
  &.nopad {
    padding-right: 0;
  }
  @media (max-width: 500px) {
    text-align: center;
    font-size: 2.5rem;
    line-height: 3rem;
    padding: 0 0 3rem 0;
  }
`;
const FlexContainerStayRow = FlexContainer.extend`
  @media (max-width: 500px) {
    flex-direction: row;
    > div {
      height: 50vh;
      align-items: center;
    }
  }
`;
const Frame = styled.div`
  position: relative;
  width: 90%;
  height: 0;
  padding-bottom: 51%;
  iframe {
    border: none;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0; right: 0;
  }
`;


const Home = React.createClass({

  getInitialState() {
    return {
      centerNavColor: COLORS.white
    }
  },

  componentDidMount() {
    this.interval = window.setInterval(() => this.getNavColor(), 200);
  },

  componentWillUnmount() {
    this.interval && window.clearInterval(this.interval);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.centerNavColor !== this.state.centerNavColor;
  },

  getNavColor() {
    const whiteSectionEl = ReactDOM.findDOMNode(this.refs.whiteSection);
    const whiteSectionOffset = whiteSectionEl && whiteSectionEl.offsetTop;
    const color = window.scrollY > whiteSectionOffset ? COLORS.black : COLORS.white;
    this.setState({
      centerNavColor: color
    });
  },

  render() {
    const props = this.props;
    const localContext = this.context.localContext;
    const content = key => localContext.getContent('home', key);

    return (
      <div>

        <CenterNav
          isExpanded={ scrollLimit(1000) }
          color={ this.state.centerNavColor }
          fixed
        />

          <Div background={ COLORS.black } position="relative" overflow="hidden">
            <FlexContainerStayRow height="100vh">
              <ContentLeft position="relative" overflow="visible">
                <HeroScroll left/>
                <Hideable hideInitially isVisible>
                  <ReactSVG
                    path={ localContext.assetUrl('/images/radical_left.svg') }
                    style={{
                      fill: COLORS.white,
                      width: '40vw',
                      position: 'relative',
                      zIndex: '1'
                    }}
                  />
                </Hideable>
              </ContentLeft>
              <CenterNavBackground fullHeight background={ COLORS.gold } />
              <Content position="relative" overflow="visible">
                <HeroScroll right/>
                <Hideable hideInitially isVisible>
                  <ReactSVG
                    path={ localContext.assetUrl('/images/radical_right.svg') }
                    style={{
                      fill: COLORS.white,
                      width: '40vw',
                      position: 'relative',
                      zIndex: '1'
                    }}
                  />
                </Hideable>
              </Content>
            </FlexContainerStayRow>
            <ScrollPrompt isVisible={ scrollLimit(500) } />
          </Div>

          <Div>
            <FlexContainer height="100vh">
              <ContentLeft>
                <div>
                  <H2 color={ COLORS.black }>
                    { content('hero_2_title') }&mdash;
                  </H2>
                  <H2 fontWeight="normal">
                    { content('hero_2_subtitle') }
                  </H2>
                </div>
              </ContentLeft>
              <CenterNavBackground fullHeight background={ COLORS.black } />
              <Content>
                <div>
                  <LargeImg
                    src={ localContext.assetUrl('/images/hero_2.png') }
                  />
                  <Hero2Caption>
                    { content('hero_2_caption') }
                  </Hero2Caption>
                  <Hero2Text>
                    { content('hero_2_text') }
                  </Hero2Text>
                </div>
              </Content>
            </FlexContainer>

          </Div>

          <Div background={ COLORS.white } padding="30px 0 70px 0" ref="whiteSection">
            <Hideable autoHide>
              <FlexContainer marginBottom="3.4rem" paddingTop="1.25rem">
                <ContentLeft>
                  <H2 color={ COLORS.black }>
                    { content('video_title') }
                  </H2>
                </ContentLeft>
                <CenterNavBackground />
                <Content>
                  <SectionSub color={ COLORS.gold }>
                    { content('video_subtitle') }
                  </SectionSub>
                </Content>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <Frame>
                  <iframe
                    src="https://www.youtube.com/embed/doKR3fg9vU8"
                    frameborder="0" allowfullscreen
                  />
                </Frame>
              </FlexContainer>

              <FlexContainer marginBottom="3.4rem" paddingTop="3.75rem" marginTop="2rem">
                <ContentLeft>
                  <H2 color={ COLORS.black } textAlign="center">
                    { content('insta_title') }
                  </H2>
                </ContentLeft>
                <CenterNavBackground />
                <Content>
                  <SectionSub color={ COLORS.gold }>
                    { content('insta_subtitle') }
                  </SectionSub>
                </Content>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <InstaWrapper>
                  <iframe
                    src="//lightwidget.com/widgets/5b1f946ab3d85c48b8e6609b596fc9e1.html"
                    scrolling="no"
                    allowTransparency="true"
                  />
                </InstaWrapper>
                <a href={ IG_LINK }>
                  <Button marginTop="2.5rem">
                    { content('see_more_btn') }
                  </Button>
                </a>
              </FlexContainer>
            </Hideable>
          </Div>

          <Div background={COLORS.gray} padding="2.5rem 0">
            <FlexContainer>
              <ContentLeft>
                <H2 color={ COLORS.black }>
                  { content('press_title') }
                </H2>
              </ContentLeft>
              <CenterNavBackground />
              <Content>
                <SectionSub color={ COLORS.black }>
                  { content('press_subtitle') }
                </SectionSub>
              </Content>
            </FlexContainer>
            <FlexContainer >
              <ContentLeft>
                <div>
                  <LargeImg marginRight="-1.9em"
                    src={ localContext.assetUrl('/images/RAD_sponsors-01.png') }
                  />
                </div>
              </ContentLeft>
              <CenterNavBackground />
              <Content>
                <div>
                  <LargeImg marginLeft="-2.3em"
                    src={ localContext.assetUrl('/images/RAD_sponsors-02.png') }
                  />
                </div>
              </Content>
            </FlexContainer>
          </Div>

          <Footer />

      </div>
    );
  }

});

Home.contextTypes = {
  localContext: React.PropTypes.object
}

export default Home;
