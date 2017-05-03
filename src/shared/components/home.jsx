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

const HeroH1 = styled.h1`
  font-size: 7.2vw;
  line-height: 7.2vw;
`;
const Hero2Caption = styled.h3`
  margin: 16px 0 8px 0;
`;
const Hero2Text = styled.p`
  margin-right: 18%;
`;
const LargeImg = styled.img`
  width: 88%;
  max-width: 1200px;
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
            <FlexContainer>
              <ContentLeft position="relative" overflow="visible">
                <HeroScroll left/>
                <Hideable hideInitially isVisible>
                  <ReactSVG
                    path={ localContext.assetUrl('/images/radical_left.svg') }
                    style={{
                      fill: COLORS.white,
                      width: '60vh',
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
                      width: '60vh',
                      position: 'relative',
                      zIndex: '1'
                    }}
                  />
                </Hideable>
              </Content>
            </FlexContainer>
            <ScrollPrompt isVisible={ scrollLimit(500) } />
          </Div>

          <Div>
            <FlexContainer>
              <ContentLeft>
                <Hideable autoHide>
                  <H2 color={ COLORS.black }>
                    { content('hero_2_title') }&mdash;
                  </H2>
                  <H2 fontWeight="normal">
                    { content('hero_2_subtitle') }
                  </H2>
                </Hideable>
              </ContentLeft>
              <CenterNavBackground fullHeight background={ COLORS.black } />
              <Content>
                <Hideable autoHide>
                  <Img
                    width="90%"
                    src={ localContext.assetUrl('/images/hero_2.png') }
                  />
                  <Hero2Caption>
                    { content('hero_2_caption') }
                  </Hero2Caption>
                  <Hero2Text>
                    { content('hero_2_text') }
                  </Hero2Text>
                </Hideable>
              </Content>
            </FlexContainer>

          </Div>

          <Div background={ COLORS.white } padding="30px 0 70px 0" ref="whiteSection">
            <Hideable autoHide>
              <FlexContainer marginBottom="55px" paddingTop="20px">
                <ContentLeft>
                  <H2 color={ COLORS.black }>
                    { content('video_title') }
                  </H2>
                </ContentLeft>
                <CenterNavBackground />
                <Content>
                  <H5 color={ COLORS.gold }>
                    { content('video_subtitle') }
                  </H5>
                </Content>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <LargeImg
                  src={ localContext.assetUrl('/images/video_preview.png') }
                />
              </FlexContainer>

              <FlexContainer marginBottom="55px" paddingTop="60px">
                <ContentLeft>
                  <H2 color={ COLORS.black }>
                    { content('insta_title') }
                  </H2>
                </ContentLeft>
                <CenterNavBackground />
                <Content>
                  <H5 color={ COLORS.gold }>
                    { content('insta_subtitle') }
                  </H5>
                </Content>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <LargeImg
                  src={ localContext.assetUrl('/images/insta_shim.png') }
                />
                <Button marginTop="40px">
                  { content('see_more_btn') }
                </Button>
              </FlexContainer>
            </Hideable>
          </Div>

          <Div background={COLORS.gray} padding="40px 0">
            <FlexContainer>
              <ContentLeft>
                <H2 color={ COLORS.black }>
                  { content('press_title') }
                </H2>
              </ContentLeft>
              <CenterNavBackground />
              <Content>
                <H5 color={ COLORS.black }>
                  { content('press_subtitle') }
                </H5>
              </Content>
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <LargeImg
                src={ localContext.assetUrl('/images/press.png') }
              />
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
