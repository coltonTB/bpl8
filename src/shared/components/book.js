import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer } from '../style/flexbox';
import { Div, H5, Img, Span, Button, P } from '../style/util';
import { Hideable } from '../style/hideable';

import { Content, ContentLeft } from '../style/content-column';
import { CenterNav, CenterNavBackground } from './center-nav';
import { Footer } from './footer'

const bookStyle = `
  flex-wrap: nowrap;
  flex-direction: column;
  width: 500px;
  margin-bottom: 2.5rem;
  align-self: flex-start;
  @media (max-width: 500px) {
    width: auto;
  }
`;
const BookLeft = styled(ContentLeft)`${ bookStyle }`;
const BookRight = styled(Content)`${ bookStyle }`;
const Image = styled(Img)`
  width: 100%;
  margin-bottom: 1.25rem;
`;
const StoreItemCaption = styled.div`
  text-align: left;
  color: ${ COLORS.white };
  font-weight: bold;
  margin-top: 20px;
`;
const BuyButton = styled(Button)`
  background: ${ COLORS.black };
  font-size: 1.8rem;
  width: 260px;
`;

const Book = (props, { localContext }) => {
  const content = key => localContext.getContent('book', key);

  return (
    <Div background={COLORS.gold}>

      <CenterNav fixed/>

      <FlexContainer>
        <ContentLeft align="flex-start">
          <h2>
            { content('title') }
          </h2>
        </ContentLeft>
        <CenterNavBackground />
        <Content color={ COLORS.gold }>
          <H5 color={ COLORS.black }>
            { content('subtitle') }
          </H5>
        </Content>
      </FlexContainer>

      <Div padding="2.75rem 0">
        <Hideable hideInitially isVisible>
          <FlexContainer>
            <BookLeft>
              <div>
                <Image src={ localContext.assetUrl('/images/store_item_3.png') } />
              </div>
              <StoreItemCaption>
                <h3>
                  <Span textTransform="capitalize" color={ COLORS.black }>
                      { content('book_title') },&nbsp;
                  </Span>
                  <Span textTransform="capitalize" color={ COLORS.white }>
                      { content('book_title_2') }&nbsp;
                  </Span>
                  <Span color={ COLORS.white }>
                    &mdash;&nbsp;${ content('book_price') }
                  </Span>
                </h3>
                <P color={ COLORS.black } fontSize="1em">
                  { content('book_printInfo') }
                  <br/>
                  { content('book_fgm') }
                </P>
              </StoreItemCaption>
            </BookLeft>
            <CenterNavBackground />
            <BookRight>
              <h3>
                <Span color={ COLORS.white } textTransform="uppercase">
                  { content('book_title') },&nbsp;
                </Span>
                <Span color={ COLORS.black }>
                  { content('book_title_2') }
                </Span>
              </h3>
              <P>
                { content('book_summary') }
              </P>
            </BookRight>
          </FlexContainer>
        </Hideable>
      </Div>

      <Footer />

    </Div>
  );
}

Book.contextTypes = {
  localContext: React.PropTypes.object
};

export default Book;
