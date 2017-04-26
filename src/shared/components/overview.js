import React from 'react';
import ReactDOM from 'react-dom';
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
  width: ${ props => props.selectedSourceLink === null ? '140px' : '100%' };
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

const SourceLinkCenterStyle = styled.div`
  color: ${ COLORS.white };
  text-align: center;
  position: fixed;
  top: 45%;
  width: 140px;
  box-sizing: border-box;
  padding: 0 10px;
  z-index: 2;
`;

const SourceLinkCenter = React.createClass({

  propTypes: {
    id: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  render() {
    const Number = styled.h5`
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #ddd;
      }
    `
    return (
      <SourceLinkCenterStyle>
        <Number onClick={() => this.props.onClick(this.props.id)}>
          { this.props.id }
        </Number>
        {
          this.props.id && (
            <div>
              Few thousands of characters.
              No alphabet.
              Millions of customers await whoever solves the puzzle first.
            </div>
          )
        }
      </SourceLinkCenterStyle>
    );
  }
});

const SourceCloseButton = styled.div`
  text-transform: uppercase;
  color: ${ COLORS.white };
  cursor: pointer;
  position: fixed;
  top: 45%;
  width: 140px;
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
      visibleSourceLink: null,
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

  getVisibleSourceLink() {
    let visibleSourceLink = null;
    const sourceLinkCenter = ReactDOM.findDOMNode(this.refs.sourceLinkCenter);
    if (sourceLinkCenter) {
      const offset = sourceLinkCenter.offsetTop;
      const offsetAbsoluteHeight = window.scrollY + offset - 200;
      this.state.sourceLinks.forEach((srcLink, i) => {
        const linkOffset = srcLink.el.offsetTop;
        if (offsetAbsoluteHeight > linkOffset) {
          visibleSourceLink = i;
        }
      });
      const lastSourceLink = this.state.sourceLinks[this.state.sourceLinks.length - 1];
      const lastSourceLinkOffset = lastSourceLink.el.offsetTop;
      if (offsetAbsoluteHeight > lastSourceLinkOffset + 300) {
        visibleSourceLink = null;
      }
    }
    this.setState({visibleSourceLink});
  },

  clearState() {
    this.setState(this.getInitialState());
  },

  componentDidMount() {
    this.interval = window.setInterval(() => this.getVisibleSourceLink(), 200);
  },

  componentWillUnmount() {
    this.interval && window.clearInterval(this.interval);
  },

  render() {
    const content = key => this.context.localContext.getContent('overview', key);
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

        <CenterNav isExpanded={ () => this.state.selectedMachine === null && scrollLimit(TOP_SECTION_HEIGHT)() } fixed/>

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
                />
                <Machine
                  top="600px"
                  data={ content('machines')[2] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
                <Machine
                  top="1170px"
                  data={ content('machines')[4] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
              </ImagesLeft>

              <CenterNavBackground flexDirection="column" onClick={stopProp}>
                {
                  this.state.selectedMachine !== null &&
                  this.state.selectedSourceLink === null &&
                  this.state.sourceLinks.length &&
                    <SourceLinkCenter
                      ref='sourceLinkCenter'
                      {...this.state.sourceLinks[this.state.visibleSourceLink]}
                      onClick={this.handleSourceLinkClick}
                    />
                }
              </CenterNavBackground>

              <ImagesRight color={ COLORS.gold }>
                <Hideable
                  isVisible={ this.state.selectedMachine !== null }
                  delay="0.3s"
                >
                  {
                    this.state.selectedMachine !== null &&
                    <MachineDetails
                      data={ content('machineDetails') }
                      selectedMachine={ this.state.selectedMachine }
                      onSourceLinksMounted={ this.renderSourceLinks }
                    />
                  }
                </Hideable>
                <Machine
                  left={LEFT_OFFSET}
                  data={ content('machines')[1] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
                <Machine
                  left={LEFT_OFFSET}
                  top="870px"
                  data={ content('machines')[3] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
                <Machine
                  left={LEFT_OFFSET}
                  top="1520px"
                  data={ content('machines')[5] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
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
