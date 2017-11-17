import { render } from 'react-dom';
import React from 'react';
import Form from 'react-jsonschema-form';
import styled from 'styled-components';
import request from 'superagent';

import contentSchema from '../../content/content-schema.json';
import getLocalContext from '../../lib/get-local-context';
import withLocalContext from '../../lib/with-local-context';

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
  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    padding-left: 40px;
    padding-bottom: 20px;
  }
`;
const PreviewContainer = styled.div`
  width: 60%;
  height: 100%;
  position: absolute;
  right: 0;
  iframe {
    border: none;
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
    const content = window.__locals__.content;
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
    const content = window.__locals__.content;
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
    if (!window.confirm("Are you sure? This will save changes to the staging server.")) {
      return;
    }
    request
      .post(this.context.localContext.resourceUrl('/admin/content'))
      .send({
        data: e.formData,
        path: this.state.path
      })
      .end((err, res) => {
        if (err) {
          return window.alert('There was an error saving the content.');
        }
        window.alert('Content successfully saved');
        console.log(err, res);
      });
  },

  onPublishClick() {
    if (!window.confirm("Are you sure? This will publish your changes to the production website.")) {
      return;
    }
    request
      .post(this.context.localContext.resourceUrl('/admin/publish'))
      .end((err, res) => {
        if (err) {
          return window.alert('There was an error publishing the content.');
        }
        window.alert('Content successfully published!');
        console.log(err, res);
      });
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
            acceptcharset="ISO-8859-1"
          />
          <button
            onClick={this.onPublishClick}
            className="btn"
          >
            Publish
          </button>
        </EditorContainer>
        <PreviewContainer>
          <iframe
            src={this.context.localContext.resourceUrl("/")}
            ref="viewerIframe"
          />
        </PreviewContainer>
      </div>
    );
  }
});

Index.contextTypes = {
  localContext: React.PropTypes.object
};

function renderPage() {
  const localContext = getLocalContext({
    stageContext: window.__locals__.stageContext,
    content: window.__locals__.content
  });

  const IndexWithLocalContext = withLocalContext(
    Index,
    localContext
  );

  render(
    React.createElement(IndexWithLocalContext),
    document.getElementById('app-content')
  );
}

renderPage();
