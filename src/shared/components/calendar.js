import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H2, H5, H4, Img, P } from '../style/util'
import { Hideable } from '../style/hideable';

import { HeroTextLeft, HeroText } from './hero-text';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer, isFooterNavVisible } from './footer'

const InfoLeft = styled(HeroTextLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 420px;
  margin-bottom: 36px;
`;
const InfoRight = styled(HeroText)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: 420px;
  margin-bottom: 36px;
`;

const Date = (item, i) => (
  <FlexContainer key={i}>
    <InfoLeft align="flex-start" color={ COLORS.black }>
      <Div color={ COLORS.gold }>
        <strong>Open</strong>
      </Div>
      <h5>
        {item.open}
      </h5>
      <Div color={ COLORS.gold } marginTop="12px">
        <strong>Close</strong>
      </Div>
      <h5>
        {item.close}
      </h5>
    </InfoLeft>
    <CenterNavBackground />
    <InfoRight color={ COLORS.black }>
      <div>
        Stop { i+1 }&mdash;
      </div>
      <h3>
        {item.location}
      </h3>
      <H4 color={ COLORS.gold }>
        { item.address1 }<br/>
        { item.address2 }
      </H4>
    </InfoRight>
  </FlexContainer>
);

const Info = (props, { localContext }) => {
  const content = key => localContext.content('calendar', key);

  return (
    <Div background={COLORS.white}>

      <CenterNav color={ COLORS.gold } fixed />

      <FlexContainer>
        <InfoLeft align="flex-start">
          <H2 color={ COLORS.black }>
            { content('title') }
          </H2>
        </InfoLeft>
        <CenterNavBackground />
        <InfoRight>
          <H5 color={ COLORS.gold }>
            { content('subtitle') }
          </H5>
        </InfoRight>
      </FlexContainer>

      <Div padding="20px 0 40px 0">
        <Hideable hideInitially isVisible>
          { content('dates').map(Date) }
        </Hideable>
      </Div>

      <FlexContainer background={ COLORS.gold }>
        <InfoLeft align="flex-start">
          <H4 color={ COLORS.white }>
            { content('contact_prompt') }
          </H4>
        </InfoLeft>
        <CenterNavBackground />
        <InfoRight>
          <H4 color={ COLORS.black }>
            { content('contact_name') }
          </H4>
          <Div color={ COLORS.white }>
            { content('contact_sub') }
          </Div>
          <Div color="black" marginTop="20px">
            { content('contact_details') }
          </Div>
        </InfoRight>
      </FlexContainer>

      <Footer />

    </Div>
  );
}

Info.contextTypes = {
  localContext: React.PropTypes.object
};

export default Info;
