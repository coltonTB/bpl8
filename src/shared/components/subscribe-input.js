import React from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg'

import { Input, Button } from '../style/util';
import { COLORS } from '../constants';

let request;

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
    request = require('superagent');
  },

  getInitialState() {
    return {
      value: '',
      loadingState: 'ready'
    }
  },

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  },

  handleKeydown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  },

  handleSubmit() {
    if (!request || this.state.loadingState !== 'ready') {
      return;
    }

    this.setState({
      loadingState: 'loading'
    });
    request
      .post('https://x5a6rxfai1.execute-api.us-west-1.amazonaws.com/prod/signup')
      .send({
        emailToAdd: this.state.value
      })
      .end((err, res) => {
        if (err) {
          return this.setState({
            loadingState: 'error'
          })
        }
        this.setState({
          loadingState: 'success'
        });
      });
  },

  render() {

    if (this.state.loadingState === 'loading') {
      return (
        <SubscribeInputStyle display="flex">
          Thank you for subscribing!
        </SubscribeInputStyle>
      );
    } else if (this.state.loadingState === 'error') {
      return (
        <SubscribeInputStyle display="flex">
          An error occured. Please try again.
        </SubscribeInputStyle>
      );
    }

    return (
      <SubscribeInputStyle display="flex">
        <Input
          placeholder={ this.context.localContext.getContent('footer', 'subscribe_prompt') }
          value={ this.state.value }
          onChange={ this.handleInputChange }
          disabled={ this.state.loadingState !== 'ready' }
          onKeyDown={ this.handleKeydown }
        />
        <Button onClick={ this.handleSubmit }>
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
