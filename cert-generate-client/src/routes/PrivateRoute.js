import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    rest.isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/register',
          state: {from: props.location}
        }}
      />
    ))
  }/>
);

//----------------------------------------------------------------------------------------------------------------------

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

//----------------------------------------------------------------------------------------------------------------------

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

//----------------------------------------------------------------------------------------------------------------------

export default withRouter(connect(mapStateToProps)(PrivateRoute));