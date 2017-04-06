import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Px, PxSection } from '../style/parallax';

import { HeroText, HeroTextLeft } from './hero-text';
import { CenterNav, CenterNavInner, CenterNavList, CenterNavPlaceholder } from './center-nav';
import { Footer } from './footer'

const MachinesWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  max-width: 1200px;
  margin-bottom: 60px;
`;

const MachineWrapper = styled(FlexItem)`
  margin: 14px;
  flex-direction: column;
  width: 29%;
  flex: 1 1 auto;
`;

const MachineBg = styled.div`
  background: ${ COLORS.gold };
  height: 260px;
`;

const MachineCaption = styled.div`
  text-align: center;
  color: ${ COLORS.white };
  font-weight: bold;
`;

const Machine = (machine, i) => (
  <MachineWrapper key={i}>
    <MachineBg />
    <MachineCaption>
      <p>{ machine.caption }</p>
    </MachineCaption>
  </MachineWrapper>
)

const PlaceHolderMachine = styled(MachineWrapper)`
  visibility: hidden;
`;

const Overview = (props, { localContext }) => {
  const content = key => localContext.content('overview', key);
  return (
    <div style={{ background: COLORS.black }}>
      <CenterNav>
        <CenterNavList />
      </CenterNav>
      <Px style={{minHeight: '120vh'}}>
        <PxSection>
          <FlexContainer>
            <HeroTextLeft align="flex-start">
              <h2>
                { content('title') }
              </h2>
            </HeroTextLeft>
            <CenterNavPlaceholder />
            <HeroText color={ COLORS.gold }>
              <h5>
                { content('subtitle') }
              </h5>
            </HeroText>
          </FlexContainer>

          <FlexContainer wrap>
            <MachinesWrapper>
              { [ ...content('machines').map(Machine), <PlaceHolderMachine key={10}/> ] }
            </MachinesWrapper>
          </FlexContainer>

          <Footer />
        </PxSection>
      </Px>
    </div>
  );
}

Overview.contextTypes = {
  localContext: React.PropTypes.object
}

export default Overview;
