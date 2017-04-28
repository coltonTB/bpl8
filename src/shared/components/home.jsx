import ReactDOM from 'react-dom';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Button, Img, Div, H2, H3, H5 } from '../style/util';
import { Hideable } from '../style/hideable';
import { scrollLimit, scrollMin } from '../style/scroll-helpers';

import { CenterNav, CenterNavBackground, CenterNavMini } from './center-nav';
import { Content, ContentLeft } from '../style/content-column';
import { Footer, isAtPageBottom } from './footer';
import { ScrollPrompt } from './scroll-prompt';

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

          <Div background={ COLORS.black } position="relative">
            <FlexContainer>
              <ContentLeft>
                <Hideable hideInitially isVisible>
                  <h1>
                    { content('hero_text_left') }
                  </h1>
                </Hideable>
              </ContentLeft>
              <CenterNavBackground fullHeight background={ COLORS.gold } />
              <Content>
                <Hideable hideInitially isVisible>
                  <h1>
                    { content('hero_text_right') }
                  </h1>
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
                  <H2>
                    { content('hero_2_subtitle') }
                  </H2>
                </Hideable>
              </ContentLeft>
              <CenterNavBackground fullHeight background={ COLORS.black } />
              <Content>
                <Hideable autoHide>
                  <div>
                    <Img
                      src={ localContext.assetUrl('/images/hero_2.png') }
                      height="300px"
                    />
                  </div>
                  <H3 margin="16px 0 8px 0">
                    { content('hero_2_caption') }
                  </H3>
                  <p>
                    { content('hero_2_text') }
                  </p>
                </Hideable>
              </Content>
            </FlexContainer>

          </Div>

          <Div background={COLORS.white} padding="30px 0 70px 0" ref="whiteSection">
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
                <Img
                  src={ localContext.assetUrl('/images/video_preview.png') }
                  height="50vh"
                />
              </FlexContainer>

              <FlexContainer marginBottom="55px" paddingTop="60px">
                <ContentLeft align="flex-start">
                  <H2 color={ COLORS.black }>
                    { content('insta_title') }
                  </H2>
                </ContentLeft>
                <CenterNavBackground />
                <Content align="flex-start">
                  <H5 color={ COLORS.gold }>
                    { content('insta_subtitle') }
                  </H5>
                </Content>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <Img
                  src={ localContext.assetUrl('/images/insta_shim.png') }
                  height="30vh"
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
              <Img
                src={ localContext.assetUrl('/images/press.png') }
                height="30vh"
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
