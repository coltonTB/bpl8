import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Span, Div } from '../style/util'

import { HeroText, HeroTextLeft } from './hero-text';
import { CenterNav, CenterNavInner, CenterNavList, CenterNavPlaceholder } from './center-nav';
import { Footer } from './footer'

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

const MachineWrapper = styled(FlexItem)`
  flex-direction: column;
  flex: 1 1 auto;
`;

const MachineImg = styled.img`
  width: 100%;
`;

const MachineCaption = styled.div`
  text-align: left;
  color: ${ COLORS.white };
  font-weight: bold;
  margin-bottom: 80px;
`;

const Machine = ({ data }, { localContext }) => (
  <MachineWrapper>
    <MachineImg src={ localContext.assetUrl(data.fullImg) }/>
    <MachineCaption>
      <p>
        <Span textTransform="uppercase">{ data.title },</Span>
        <Span color={ COLORS.gold }> from { data.year } </Span>
        <Span color={ COLORS.gold }>{ data.caption_a }, </Span>
        <Span>{ data.caption_b } </Span>
      </p>
    </MachineCaption>
  </MachineWrapper>
)

Machine.contextTypes =  {
  localContext: React.PropTypes.object
};

const Overview = (props, { localContext }) => {
  const content = key => localContext.content('overview', key);

  return (
    <Div background={COLORS.black} paddingTop="20px">
      <CenterNav>
        <CenterNavList />
      </CenterNav>

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
        <MachinesContainer>
          <ImagesLeft align="flex-start" width="500px">
            <Machine data={content('machines')[0] } />
            <Machine data={content('machines')[2] } />
            <Machine data={content('machines')[4] } />
          </ImagesLeft>
          <CenterNavPlaceholder />
          <ImagesRight color={ COLORS.gold } align="flex-start" width="500px">
            <Machine data={content('machines')[1] } />
            <Machine data={content('machines')[3] } />
            <Machine data={content('machines')[5] } />
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
