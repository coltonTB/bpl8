import React from 'react';
import ReactSVG from 'react-svg'
import styled, { css } from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, Span, P, A } from '../style/util'
import { Hideable } from '../style/hideable';
import { scrollLimit, scrollToTop } from '../style/scroll-helpers';

import { HeroText, HeroTextLeft } from './hero-text';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer } from './footer'
import { Machine } from './machine';
import { Machine1 } from './machine-details';
import { Source1Text, Source1Images } from './sources';

const TOP_SECTION_HEIGHT = 210;
const LEFT_OFFSET = "690px";
const stopProp = e => e.stopPropagation();

const ImagesLeft = styled(HeroTextLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 500px;
  align-self: flex-start;
  padding: 12px;
`;
const ImagesRight = styled(HeroText)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 500px;
  align-self: flex-start;
  padding: 12px;
`;

const MachinesContainer = styled(Div)`
  display: flex;
  flex-wrap: nowrap;
  height: 2050px;
  max-width: 1300px;
  margin-top: 80px;
  position: relative;
`;

const ExpandableCenterNav = styled.div`
  background: ${ COLORS.gold };
  height: 2671px;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  position: absolute;
  right: 0;
  opacity: ${ props => props.selectedMachine === null ? 0 : 1 };
  width: ${ props => props.selectedSourceLink === null ? '140px' : '100vw' };
  transition: width 0.2s ease-out;
  z-index: 1;
`;

const MachineDetailsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${ LEFT_OFFSET } ;
  opacity: ${ props => props.selectedMachine === null
    ? 0
    : 1
  };
  color: { COLORS.white }
`;

const MachineDetails = props => {
  const data = props.data[0];
  return (
    <MachineDetailsWrapper {...props}>
      <h3>
        <Span color={ COLORS.white } textTransform="uppercase">
          { data.title },&nbsp;
        </Span>
        <Span color={ COLORS.gold }>
          { data.subtitle }
        </Span>
      </h3>
      <Machine1
        onSourceLinksMounted={ props.onSourceLinksMounted }
        onLinkClick={ props.onLinkClick }
      />
    </MachineDetailsWrapper>
  );
};

const SourceLinkCenter = ({id, el, customOffset=0, onClick}) => {
  const Style = styled.div`
    color: ${ COLORS.white };
    text-align: center;
    position: absolute;
    top: ${ props => props.top }px;
    width: 140px;
    box-sizing: border-box;
    padding: 0 10px;
    align-self: column;
    z-index: 2;
  `;
  const Number = styled.h5`
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #ddd;
    }
  `
  return (
    <Style top={el.offsetTop + customOffset} >
      <Number onClick={() => onClick(id)}>
        { id }
      </Number>
      <div>
        Few thousands of characters.
        No alphabet.
        Millions of customers await whoever solves the puzzle first.
      </div>
    </Style>
  );
};

const SourceCloseButton = styled.div`
  text-transform: uppercase;
  color: ${ COLORS.white };
  cursor: pointer;
  span {
    display: inline-block;
    padding-top: 14px;
    text-decoration: underline;
  }
`;

const Overview = React.createClass({

  getInitialState() {
    return {
      selectedMachine: null,
      selectedSourceLink: null,
      sourceLinks: []
    }
  },

  handleMachineClick(data) {
    const selectedMachine = data.id === this.state.selectedMachine ? null : data.id;
    this.setState({
      selectedMachine
    });
    scrollToTop();
  },

  handleSourceLinkClick(id) {
    this.setState({
      selectedSourceLink: id
    });
    scrollToTop();
  },

  renderSourceLinks(links) {
    this.setState({
      sourceLinks: links
    })
  },

  clearState() {
    this.setState(this.getInitialState());
  },

  render() {
    const content = key => this.context.localContext.content('overview', key);
    return (
      <Div background={ COLORS.black } onClick={ this.clearState }>

        <ExpandableCenterNav
          onClick={ stopProp }
          selectedMachine={ this.state.selectedMachine }
          selectedSourceLink={ this.state.selectedSourceLink }
        >
          <FlexContainer>
            <HeroTextLeft align="flex-start">
              <h2>
                { content('title') }
              </h2>
            </HeroTextLeft>
            <CenterNavBackground />
            <HeroText color={ COLORS.white } align="flex-start">
              <h5>
                { content('subtitle') }
              </h5>
            </HeroText>
          </FlexContainer>
          <FlexContainer>
            <HeroTextLeft align="flex-start">
              <Source1Images />
            </HeroTextLeft>
            <CenterNavBackground textAlign="center">
              <Hideable isVisible={ this.state.selectedSourceLink !== null } hideInitially>
                <SourceCloseButton onClick={ () => this.handleSourceLinkClick(null) }>
                  <ReactSVG
                    path={ this.context.localContext.assetUrl('/images/close.svg') }
                    style={{
                      fill: COLORS.white,
                      height: '46px',
                      width: '100%',
                      textAlign: 'center'
                    }}
                  />
                  <Span>close</Span>
                </SourceCloseButton>
              </Hideable>
            </CenterNavBackground>
            <HeroText color={ COLORS.white } align="flex-start" >
              <Source1Text />
            </HeroText>
          </FlexContainer>
        </ExpandableCenterNav>

        <CenterNav isExpanded={ () => this.state.selectedMachine === null && scrollLimit(TOP_SECTION_HEIGHT)()} fixed/>

        <FlexContainer height={TOP_SECTION_HEIGHT + 'px'}>
          <HeroTextLeft align="flex-start">
            <h2>
              { content('title') }
            </h2>
          </HeroTextLeft>
          <CenterNavBackground />
          <HeroText color={ COLORS.gold } align="flex-start">
            <h5>
              { content('subtitle') }
            </h5>
          </HeroText>
        </FlexContainer>

        <Hideable hideInitially isVisible>

          <FlexContainer>
            <MachinesContainer>
              <ImagesLeft>
                <Machine
                  data={ content('machines')[0] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                  detailsOrientation="right"
                />
                <Machine
                  top="600px"
                  data={ content('machines')[2] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                  detailsOrientation="right"
                />
                <Machine
                  top="1170px"
                  data={ content('machines')[4] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                  detailsOrientation="right"
                />
              </ImagesLeft>

              <CenterNavBackground flexDirection="column" onClick={stopProp}>
                {
                  this.state.selectedMachine !== null &&
                  this.state.selectedSourceLink === null &&
                    this.state.sourceLinks.map((link, i) => (
                      <SourceLinkCenter {...link} key={i} onClick={this.handleSourceLinkClick}/>
                    ))
                }
              </CenterNavBackground>

              <ImagesRight color={ COLORS.gold }>
                <Hideable
                  isVisible={ this.state.selectedMachine !== null }
                  delay="0.3s"
                >
                  <MachineDetails
                    data={ content('machineDetails') }
                    selectedMachine={ this.state.selectedMachine }
                    onSourceLinksMounted={ this.renderSourceLinks }
                  />
                </Hideable>
                <Machine
                  left={LEFT_OFFSET}
                  data={ content('machines')[1] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                  detailsOrientation="left"
                />
                <Machine
                  left={LEFT_OFFSET}
                  top="870px"
                  data={ content('machines')[3] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                  detailsOrientation="left"
                />
                <Machine
                  left={LEFT_OFFSET}
                  top="1520px"
                  data={ content('machines')[5] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                  detailsOrientation="left"
                />
              </ImagesRight>
            </MachinesContainer>
          </FlexContainer>
        </Hideable>

        <Footer />

      </Div>
    );
  }
});

Overview.contextTypes = {
  localContext: React.PropTypes.object
};

export default Overview;
