import ReactDOM from 'react-dom';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Button, Img, Div, H2, H3, H5 } from '../style/util';
import { Hideable } from '../style/hideable';
import { scrollLimit, scrollMin } from '../style/scroll-helpers';

import { CenterNav, CenterNavBackground, CenterNavMini } from './center-nav';
import { HeroText, HeroTextLeft } from './hero-text';
import { Footer, isAtPageBottom } from './footer';
import { ScrollPrompt } from './scroll-prompt';

const Home = React.createClass({

  isFixedNavVisible() {
    const whiteSectionEl = ReactDOM.findDOMNode(this.refs.whiteSection);
    const whiteSectionOffset = whiteSectionEl && whiteSectionEl.offsetTop;
    return window.scrollY < whiteSectionOffset;
  },

  render() {
    const props = this.props;
    const localContext = this.context.localContext;
    const content = key => localContext.content('home', key);

    return (
      <div>

        <Hideable isVisible={this.isFixedNavVisible} listen>
          <CenterNav isExpanded={ scrollLimit(1000) } fixed>
            <ScrollPrompt isVisible={ scrollLimit(500) } />
          </CenterNav>
        </Hideable>

          <Div background={ COLORS.black }>
            <FlexContainer>
                <HeroTextLeft>
                  <Hideable hideInitially isVisible>
                    <h1>
                      { content('hero_text_left') }
                    </h1>
                  </Hideable>
                </HeroTextLeft>
                <CenterNavBackground fullHeight background={ COLORS.gold } />
                <HeroText>
                  <Hideable hideInitially isVisible>
                    <h1>
                      { content('hero_text_right') }
                    </h1>
                  </Hideable>
                </HeroText>
            </FlexContainer>
          </Div>

          <Div>
            <FlexContainer>
              <HeroTextLeft>
                <Hideable autoHide>
                  <H2 color={ COLORS.black }>
                    { content('hero_2_title') }&mdash;
                  </H2>
                  <H2>
                    { content('hero_2_subtitle') }
                  </H2>
                </Hideable>
              </HeroTextLeft>
              <CenterNavBackground fullHeight background={ COLORS.black } />
              <HeroText>
                <Hideable autoHide>
                  <div>
                    <Img src={ localContext.assetUrl('/images/hero_2.png') } height="300px" />
                  </div>
                  <H3 margin="16px 0 8px 0">
                    { content('hero_2_caption') }
                  </H3>
                  <p>
                    { content('hero_2_text') }
                  </p>
                </Hideable>
              </HeroText>
            </FlexContainer>

          </Div>

          <Div background={COLORS.white} padding="30px 0 70px 0" ref="whiteSection">
            <Hideable autoHide>
              <FlexContainer marginBottom="55px" paddingTop="20px">
                <HeroTextLeft>
                  <H2 color={ COLORS.black }>
                    { content('video_title') }
                  </H2>
                </HeroTextLeft>

                <Hideable isVisible={ () => !this.isFixedNavVisible() } listen>
                  <CenterNavMini
                    color={ COLORS.gold }
                    background={COLORS.white}
                  />
                </Hideable>

                <HeroText>
                  <H5 color={ COLORS.gold }>
                    { content('video_subtitle') }
                  </H5>
                </HeroText>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <Img src={ localContext.assetUrl('/images/video_preview.png') } height="50vh" />
              </FlexContainer>

              <FlexContainer marginBottom="55px" paddingTop="60px">
                <HeroTextLeft align="flex-start">
                  <H2 color={ COLORS.black }>
                    { content('insta_title') }
                  </H2>
                </HeroTextLeft>

                <Hideable isVisible={ () => !this.isFixedNavVisible() } listen>
                  <CenterNavMini
                    color={ COLORS.gold }
                    background={COLORS.white}
                  />
                </Hideable>

                <HeroText align="flex-start">
                  <H5 color={ COLORS.gold }>
                    { content('insta_subtitle') }
                  </H5>
                </HeroText>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <Img src={ localContext.assetUrl('/images/insta_shim.png') } height="30vh" />
                <Button marginTop="40px">
                  { content('see_more_btn') }
                </Button>
              </FlexContainer>
            </Hideable>
          </Div>

          <Div background={COLORS.gray} padding="40px 0">
            <FlexContainer>
              <HeroTextLeft>
                <H2 color={ COLORS.black }>
                  { content('press_title') }
                </H2>
              </HeroTextLeft>
              <Hideable isVisible={ isAtPageBottom } listen>
                <CenterNavMini
                  color={ COLORS.gold }
                  background={COLORS.gray}
                />
              </Hideable>
              <HeroText>
                <H5 color={ COLORS.black }>
                  { content('press_subtitle') }
                </H5>
              </HeroText>
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <Img src={ localContext.assetUrl('/images/press.png') } height="30vh" />
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
