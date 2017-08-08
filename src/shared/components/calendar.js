import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H2, H3, H4, H5, Img, P } from '../style/util'
import { Hideable } from '../style/hideable';
import { scrollLimit } from '../style/scroll-helpers';

import { ContentLeft, Content } from '../style/content-column';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer, isFooterNavVisible } from './footer'

const TOP_SECTION_HEIGHT = 220;
const CalendarStyle = `
  flex-wrap: nowrap;
  flex-direction: column;
  width: ${ props => props.width };
  margin-bottom: 2.25rem;
  align-self: flex-start;
`;
const CalendarLeft = styled(ContentLeft)`
  ${CalendarStyle}
  @media (max-width: 500px) {
    margin: 5rem 0 0 0;
  }
`;
const CalendarRight = styled(Content)`
  ${CalendarStyle}
`;
CalendarLeft.defaultProps = CalendarRight.defaultProps = {
  width: '38.75rem'
};

const Date = (item, i) => (
  <FlexContainer key={i}>
    <CalendarLeft color={ COLORS.black }>
      <H5 color={ COLORS.gold } className="nopad">
        Open
      </H5>
      <h3>
        { item.open }
      </h3>
      <H5 color={ COLORS.gold } margin="0.875rem 0 0 0" className="nopad">
        Close
      </H5>
      <h3>
        { item.close }
      </h3>
    </CalendarLeft>
    <CenterNavBackground />
    <CalendarRight color={ COLORS.black }>
      <H5>
        Stop { i+1 }&mdash;
      </H5>
      <H2 margin="0.25rem 0">
        { item.location }
      </H2>
      <H3 color={ COLORS.gold } fontWeight="normal">
        { item.address1 }<br/>
        { item.address2 }
      </H3>
    </CalendarRight>
  </FlexContainer>
);

const Calendar = (props, { localContext }) => {
  const content = key => localContext.getContent('calendar', key);

  return (
    <Div background={COLORS.white}>

      <CenterNav color={ COLORS.gold } isExpanded={scrollLimit(TOP_SECTION_HEIGHT)} fixed/>

      <FlexContainer>
        <CalendarLeft>
          <H2 color={ COLORS.black }>
            { content('title') }
          </H2>
        </CalendarLeft>
        <CenterNavBackground />
        <CalendarRight>
          <H5 color={ COLORS.gold }>
            { content('subtitle') }
          </H5>
        </CalendarRight>
      </FlexContainer>

      <Div paddingBottom="5.625rem">
        <Hideable hideInitially isVisible>
          { content('dates').map(Date) }
        </Hideable>
      </Div>

      <FlexContainer background={ COLORS.gold } padding="1.875rem 0 3.125rem 0">
        <CalendarLeft width="31.25rem">
          <H3 color={ COLORS.white }>
            { content('contact_prompt') }
          </H3>
        </CalendarLeft>
        <CenterNavBackground />
        <CalendarRight width="31.25rem">
          <H3 color={ COLORS.black }>
            { content('contact_name') }
          </H3>
          <P color={ COLORS.white } margin="0">
            { content('contact_sub') }
          </P>
          <P color="black" marginTop="1.875rem">
            { content('contact_details') }
          </P>
        </CalendarRight>
      </FlexContainer>

      <Footer />

    </Div>
  );
}

Calendar.contextTypes = {
  localContext: React.PropTypes.object
};

export default Calendar;
