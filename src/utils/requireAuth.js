import React from 'react';
// need to connect this to redux store because we need to get isAuthenticated field from it.
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        // if its not authenticated
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
        this.context.router.push('/login');
      }
    }
    // update to props.
    // so if is Authenticated is false, change to root page.
    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  // from state.auth.isAuthenticated, now have a prop that is a bool.
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}