import { render } from 'react-dom';
import React from 'react';
import Form from 'react-jsonschema-form';
import styled from 'styled-components';

import contentSchema from '../../content/content-schema.json';
import content from '../../content/content.json';

import { tryParse } from './admin-page-bridge';

const EditorContainer = styled.div`
  width: 40%;
  height: 100%;
  overflow: scroll;
  position: absolute;
  left: 0;
  background: #303030;
  padding: 40px 40px 200px;
  textarea {
    resize: vertical;
  }
`;
const PreviewContainer = styled.div`
  width: 60%;
  height: 100%;
  position: absolute;
  right: 0;
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const Index = React.createClass({

  getInitialState() {
    return {
      path: 'home'
    }
  },

  componentDidMount() {
    window.onmessage = this.onIframeRouteChange;
  },

  getSchema() {
    return {
      ...contentSchema,
      properties: contentSchema.properties[this.state.path].properties
    };
  },

  getValues() {
    return content[this.state.path];
  },

  onIframeRouteChange(e) {
    const data = tryParse(e.data);
    if (data.topic === '__viewer_route_change') {
      const newPath = data.path === '' ? 'home' : data.path;
      this.setState({
        path: newPath
      });
    }
  },

  onFormChange(e) {
    // Merge in modified content
    const modifiedContent = {
      ...content,
      [this.state.path]: e.formData
    };
    const data = JSON.stringify({
      topic: '__refresh_content',
      content: modifiedContent
    });
    this.refs.viewerIframe.contentWindow.postMessage(data, '*');
  },

  onFormSubmit(e) {
    console.log(e);
  },

  render() {
    return (
      <div>
        <EditorContainer>
          <Form
            schema={this.getSchema()}
            formData={this.getValues()}
            onSubmit={this.onFormSubmit}
            onChange={this.onFormChange}
          />
        </EditorContainer>
        <PreviewContainer>
          <iframe src="/" ref="viewerIframe"/>
        </PreviewContainer>
      </div>
    );
  }
});

render(
  React.createElement(Index),
  document.getElementById('app-content')
);
