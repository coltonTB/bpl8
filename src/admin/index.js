import { render } from 'react-dom';
import React from 'react';
import JsonEditor from 'json-editor';
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
  padding: 0 40px;
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

  renderJSONEditor() {
    const modifiedSchema = {...contentSchema};
    modifiedSchema.properties = contentSchema.properties[this.state.path].properties;
    Object.keys(modifiedSchema.properties).forEach((key, i) => {
      const val = modifiedSchema.properties[key];
      val.propertyOrder = i + 1;
    });

    this.editor = new JSONEditor(this.editorContainer, {
      schema: modifiedSchema,
      startval: content[this.state.path],
      required_by_default: true,
      disable_properties: true,
      disable_edit_json: true,
      disable_array_reorder: true,
      theme: 'bootstrap3',
      iconlib: 'bootstrap3',
      expand_height: true
    });
  },

  componentDidMount() {
    this.renderJSONEditor();
    window.onmessage = this.handleIframeRouteChange;
  },

  componentDidUpdate() {
    this.editor.destroy();
    this.renderJSONEditor();
  },

  handleIframeRouteChange(e) {
    const data = e.data && JSON.parse(e.data);
    var newPath = data && data.pathname && data.pathname.substr(1);
    newPath = newPath === '' ? 'home' : newPath;
    this.setState({
      path: newPath
    });
  },

  render() {
    return (
      <div>
        <EditorContainer innerRef={comp => this.editorContainer = comp}/>
        <PreviewContainer>
          <iframe src="/" />
        </PreviewContainer>
      </div>
    );
  }
});

render(
  React.createElement(Index),
  document.getElementById('app-content')
);
