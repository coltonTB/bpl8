import React from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg'

import { Input, Button } from '../style/util';
import { COLORS } from '../constants';

const SubscribeInputStyle = styled.span`
  display: flex;
  > button {
    margin-left: 5%;
    padding: 0.375rem 1rem;
  }
  .right-arrow-svg {
    width: 1.875rem;
    stroke: ${ COLORS.white }
  }
  @media (max-width: 500px) {
    margin: 2rem 0;
  }
`;

export const SubscribeInput = React.createClass({

  componentDidMount() {
    return;
    gapi.load('client', () => {
      gapi.client.init({
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        clientId: 'radicalmachines-178018',
        scope: 'https://www.googleapis.com/auth/spreadsheets'
      }).then(function() {
        const params = {
          spreadsheetId: '1sAj3MByJhiCBYirt18O4wU6g04fDaFpQh94h3KXuZPc',
          range: 'A:A'
        };
        gapi.client.setApiKey('AIzaSyAaEwMaskeL5T6BKo5r1PQOVhnxAPZcovc');
        gapi.client.sheets.spreadsheets.values.get(params);


      }).then(function(response) {
        console.log(response.result);
      }, function(reason) {
        console.log(reason);
      });
    });
  },

  render() {
    return (
      <SubscribeInputStyle display="flex">
        <Input placeholder={ this.context.localContext.getContent('footer', 'subscribe_prompt') } />
        <Button>
          <ReactSVG
            path={ this.context.localContext.assetUrl('/images/right_arrow.svg') }
            className="right-arrow-svg"
          />
        </Button>
      </SubscribeInputStyle>
    );
  }

});

SubscribeInput.contextTypes = {
  localContext: React.PropTypes.object
};
