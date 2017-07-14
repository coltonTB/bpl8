import { render } from 'react-dom';
import React from 'react';
import Form from 'react-jsonschema-form';
import styled from 'styled-components';

import contentSchema from '../../content/content-schema.json';
import content from '../../content/content.json';

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
    const modifiedSchema = {...contentSchema};
    modifiedSchema.properties = contentSchema.properties[this.state.path].properties;
    Object.keys(modifiedSchema.properties).forEach((key, i) => {
      const val = modifiedSchema.properties[key];
      val.propertyOrder = i + 1;
    });
    return modifiedSchema;
  },

  getValues() {
    return content[this.state.path];
  },

  renderJSONEditor() {
    this.editor = new JSONEditor(this.editorContainer, {
      ...editorStaticConfig,
      schema: this.getSchema(),
      startval: this.getValues()
    });
    this.editor.on('ready', () => {
      const inputs = this.editorContainer.querySelectorAll('input');
      Array.from(inputs).forEach(input => input.on('change', e => console.log(e)));
    });
  },

  onIframeRouteChange(e) {
    let data;
    try {
      data = JSON.parse(e.data);
      var newPath = data && data.pathname && data.pathname.substr(1);
      newPath = newPath === '' ? 'home' : newPath;
      this.setState({
        path: newPath
      });
    } catch(e) {}
  },

  onFormChange(e) {
    // Merge in modified content
    const modifiedContent = {
      ...content,
      [this.state.path]: e.formData
    };
    const data = JSON.stringify({
      topic: 'refresh_content',
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
