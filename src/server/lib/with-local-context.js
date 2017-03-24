import React from 'react';

function withLocalContext(WrappedComponent, {locals}) {
  class LocalContextWrapper extends React.Component {
    getChildContext() {
      return {
        locals
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  LocalContextWrapper.childContextTypes = {
    locals: React.PropTypes.object
  }

  return LocalContextWrapper;
}


export default withLocalContext;
