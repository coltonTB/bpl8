import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, Span, P, A } from '../style/util'

import { HeroText, HeroTextLeft } from './hero-text';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer } from './footer'
import { Machine } from './machine';
import { Machine1 } from './machine-details';

const LEFT_OFFSET = "690px";

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
  max-width: 1300px;
  height: 2200px;
  position: relative;
`;

const OverviewCenterNav = styled(CenterNavBackground)`
  flex-direction: column;
  background: ${ COLORS.gold };
  opacity: ${ props => props.selectedMachine === null
    ? 0
    : 1
  };
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
        onLinkMount={ props.onLinkMount }
        onLinkClick={ props.onLinkClick }
      />
    </MachineDetailsWrapper>
  );
};


const SourceLinkCenter = ({id, el, customOffset=0}) => {
  const Style = styled.div`
    color: ${ COLORS.white };
    text-align: center;
    position: absolute;
    top: ${ props => props.top }px;
    width: 140px;
    box-sizing: border-box;
    padding: 0 10px;
    align-self: column;
  `;
  return (
    <Style top={el.offsetTop + customOffset} >
      <h5>
        {id}
      </h5>
      <div>
        Few thousands of characters.
        No alphabet.
        Millions of customers await whoever solves the puzzle first.
      </div>
    </Style>
  );
};

const Overview = React.createClass({

  getInitialState() {
    return {
      selectedMachine: null,
      sourceLinks: []
    }
  },

  handleMachineClick(data) {
    const selectedMachine = data.id === this.state.selectedMachine ? null : data.id;
    this.setState({
      selectedMachine
    });
    this.sourceLinks = [];
    window.setTimeout(() => {
      this.setState({
        sourceLinks: this.sourceLinks
      });
    }, 2);
  },

  renderSourceLink(link) {
    if (!this.sourceLinks) {
      this.sourceLinks = [];
    }
    this.sourceLinks.push(link);
  },

  render() {
    console.log(this.state);
    const content = key => this.context.localContext.content('overview', key);
    return (
      <Div background={COLORS.black} onClick={ () => this.setState({ selectedMachine: null })}>

        <CenterNav />

        <FlexContainer>
          <HeroTextLeft align="flex-start">
            <h2>
              { content('title') }
            </h2>
          </HeroTextLeft>
          <OverviewCenterNav
            selectedMachine={this.state.selectedMachine}
            height="260px"
          />
          <HeroText color={ COLORS.gold } align="flex-start">
            <h5>
              { content('subtitle') }
            </h5>
          </HeroText>
        </FlexContainer>

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

            <OverviewCenterNav
              selectedMachine={ this.state.selectedMachine }
            >
              {
                this.state.selectedMachine !== null &&
                this.state.sourceLinks &&
                  this.state.sourceLinks.map((link, i) => (
                    <SourceLinkCenter key={i} {...link} />
                  ))
              }
            </OverviewCenterNav>

            <ImagesRight color={ COLORS.gold }>
              {
                this.state.selectedMachine !== null &&
                  <MachineDetails
                    data={ content('machineDetails') }
                    selectedMachine={ this.state.selectedMachine }
                    onLinkMount={ this.renderSourceLink }
                  />
              }
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

        <Footer />

      </Div>
    );
  }
});

Overview.contextTypes = {
  localContext: React.PropTypes.object
};

export default Overview;
