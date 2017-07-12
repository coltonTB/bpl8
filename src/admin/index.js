import { render } from 'react-dom';
import React from 'react';
import JsonEditor from 'json-editor';

const Index = React.createClass({

  componentDidMount() {
    var starting_value = [
      {
        name: "John Smith",
        age: 35,
        gender: "male",
        location: {
          city: "San Francisco",
          state: "California",
          citystate: ""
        },
        pets: [
          {
            name: "Spot",
            type: "dog",
            fixed: true
          },
          {
            name: "Whiskers",
            type: "cat",
            fixed: false
          }
        ]
      }
    ];

    // Initialize the editor
    var editor = new JSONEditor(document.getElementById('editor_holder'),{
      // Enable fetching schemas via ajax
      ajax: false,

      // The schema for the editor
      schema: {
        type: "array",
        title: "People",
        format: "tabs",
        items: {
          title: "Person",
          headerTemplate: "{{i}} - {{self.name}}",
          oneOf: [
            {
              title: "Basic Person"
            },
            {
              title: "Complex Person"
            }
          ]
        }
      },

      // Seed the form with a starting value
      startval: starting_value,

      // Disable additional properties
      no_additional_properties: true,

      // Require all properties by default
      required_by_default: true
    });
  },

  render() {
    return (
      <div id="editor_holder">
        HI
      </div>
    );
  }
});

render(
  React.createElement(Index),
  document.getElementById('app-content')
);
