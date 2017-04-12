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
  margin-top: 60px;
  display: flex;
  flex-wrap: nowrap;
  max-width: 1300px;
  margin-bottom: 60px;
`;

const Overview = (props, { localContext }) => {
  const content = key => localContext.content('overview', key);

  return (
    <Div background={COLORS.black} paddingTop="20px">

      <CenterNav />

      <FlexContainer>
        <HeroTextLeft align="flex-start">
          <h2>
            { content('title') }
          </h2>
        </HeroTextLeft>
        <CenterNavBackground />
        <HeroText color={ COLORS.gold }>
          <h5>
            { content('subtitle') }
          </h5>
        </HeroText>
      </FlexContainer>

      <FlexContainer>
        <MachinesContainer>
          <ImagesLeft align="flex-start" width="500px">
            <Machine data={ content('machines')[0] } />
            <Machine data={ content('machines')[2] } />
            <Machine data={ content('machines')[4] } />
          </ImagesLeft>
          <CenterNavBackground />
          <ImagesRight color={ COLORS.gold } align="flex-start" width="500px">
            <Machine data={ content('machines')[1] } />
            <Machine data={ content('machines')[3] } />
            <Machine data={ content('machines')[5] } />
          </ImagesRight>
        </MachinesContainer>
      </FlexContainer>

      <Footer />

    </Div>
  );
}

Overview.contextTypes = {
  localContext: React.PropTypes.object
};

export default Overview;
