import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div } from '../style/util'

import { HeroText, HeroTextLeft } from './hero-text';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer } from './footer'
import { Machine } from './machine';

const ImagesLeft = styled(HeroTextLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
`;
const ImagesRight = styled(HeroText)`
  flex-wrap: nowrap;
  flex-direction: column;
`;

const MachinesContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  max-width: 1300px;
`;

class Overview extends React.Component {

  handleMachineClick = data => {
    const selectedMachine = data.id === this.state.selectedMachine ? null : data.id;
    this.setState({
      selectedMachine
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedMachine: null
    };
  }

  render() {
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
          <CenterNavBackground height="200px" background={this.state.selectedMachine !== null ? COLORS.gold : ''} />
          <HeroText color={ COLORS.gold } align="flex-start">
            <h5>
              { content('subtitle') }
            </h5>
          </HeroText>
        </FlexContainer>

        <FlexContainer>
          <MachinesContainer>
            <ImagesLeft align="flex-start" width="500px">
              <Machine
                data={ content('machines')[0] }
                onClick={ this.handleMachineClick }
                selectedMachine={this.state.selectedMachine}
                detailsOrientation="right"
              />
              <Machine
                data={ content('machines')[2] }
                onClick={ this.handleMachineClick }
                selectedMachine={this.state.selectedMachine}
                detailsOrientation="right"
              />
              <Machine
                data={ content('machines')[4] }
                onClick={ this.handleMachineClick }
                selectedMachine={this.state.selectedMachine}
                detailsOrientation="right"
              />
            </ImagesLeft>
            <CenterNavBackground background={this.state.selectedMachine !== null ? COLORS.gold : ''} />
            <ImagesRight color={ COLORS.gold } align="flex-start" width="500px">
              <Machine
                data={ content('machines')[1] }
                onClick={ this.handleMachineClick }
                selectedMachine={this.state.selectedMachine}
                detailsOrientation="left"
              />
              <Machine
                data={ content('machines')[3] }
                onClick={ this.handleMachineClick }
                selectedMachine={this.state.selectedMachine}
                detailsOrientation="left"
              />
              <Machine
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
}

Overview.contextTypes = {
  localContext: React.PropTypes.object
};

export default Overview;
