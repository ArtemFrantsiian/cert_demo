import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Banner, TryBlock, Footer } from '../components';

const Home = ({ isLoggedIn, name }) => (
  <Fragment>
    <Banner name={name} />
    <TryBlock />
    <Footer />
  </Fragment>
);

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    name: state.auth.name
  }
};

export default connect(mapStateToProps)(Home);