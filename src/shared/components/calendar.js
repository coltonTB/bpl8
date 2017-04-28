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
const CalendarLeft = styled(ContentLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: ${ props => props.width };
  margin-bottom: 36px;
  align-self: flex-start;
`;
const CalendarRight = styled(Content)`
  flex-wrap: nowrap;
  flex-direction: column;
  width: ${ props => props.width };
  margin-bottom: 36px;
  align-self: flex-start;
`;
CalendarLeft.defaultProps = CalendarRight.defaultProps = {
  width: '420px'
};

const Date = (item, i) => (
  <FlexContainer key={i}>
    <CalendarLeft color={ COLORS.black }>
      <P color={ COLORS.gold } margin="0">
        Open
      </P>
      <h4>
        { item.open }
      </h4>
      <P color={ COLORS.gold } margin="14px 0 0 0">
        Close
      </P>
      <h4>
        { item.close }
      </h4>
    </CalendarLeft>
    <CenterNavBackground />
    <CalendarRight color={ COLORS.black }>
      <P margin="0">
        Stop { i+1 }&mdash;
      </P>
      <H3 margin="4px 0">
        { item.location }
      </H3>
      <H4 color={ COLORS.gold } fontWeight="normal">
        { item.address1 }<br/>
        { item.address2 }
      </H4>
    </CalendarRight>
  </FlexContainer>
);

const Calendar = (props, { localContext }) => {
  const content = key => localContext.getContent('calendar', key);

  return (
    <Div background={COLORS.white}>

      <CenterNav color={ COLORS.gold } isExpanded={scrollLimit(TOP_SECTION_HEIGHT)} fixed/>

      <FlexContainer height={ TOP_SECTION_HEIGHT + 'px' }>
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

      <Div paddingBottom="90px">
        <Hideable hideInitially isVisible>
          { content('dates').map(Date) }
        </Hideable>
      </Div>

      <FlexContainer background={ COLORS.gold } padding="30px 0 50px 0">
        <CalendarLeft width="500px">
          <H3 color={ COLORS.white }>
            { content('contact_prompt') }
          </H3>
        </CalendarLeft>
        <CenterNavBackground />
        <CalendarRight width="500px">
          <H3 color={ COLORS.black }>
            { content('contact_name') }
          </H3>
          <P color={ COLORS.white } margin="0">
            { content('contact_sub') }
          </P>
          <P color="black" marginTop="30px">
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
