import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Home = ({ isLoggedIn, name }) => (
  <div className="section">
    <div className="holder tac">
      <div>Welcome to Home Page</div>
      {
        isLoggedIn ? (
          <Fragment>
            <div>Hi {name}</div>
            <div>This is a private content for you</div>
          </Fragment>
        ) : <div>This is public content</div>
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    name: state.auth.name
  }
};

export default connect(mapStateToProps)(Home);