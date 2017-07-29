import React from 'react';

function withLocalContext(WrappedComponent, localContext) {
  class LocalContextWrapper extends React.Component {
    getChildContext() {
      return {
        localContext
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  LocalContextWrapper.childContextTypes = {
    localContext: React.PropTypes.object
  }

  return LocalContextWrapper;
}

export default withLocalContext;
