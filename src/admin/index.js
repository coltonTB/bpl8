import { render } from 'react-dom';
import React from 'react';
import JsonEditor from 'json-editor';

import contentSchema from '../../content/content-schema.json';
import content from '../../content/content.json';

const Index = React.createClass({

  componentDidMount() {
    var editor = new JSONEditor(this.refs.container, {
      schema: contentSchema,
      startval: content,
      required_by_default: true,
      disable_properties: true,
      disable_edit_json: true,
      theme: 'bootstrap3',
      iconlib: 'bootstrap3',
      expand_height: true
    });
  },

  render() {
    return (
      <div ref="container">
      </div>
    );
  }
});

render(
  React.createElement(Index),
  document.getElementById('app-content')
);
