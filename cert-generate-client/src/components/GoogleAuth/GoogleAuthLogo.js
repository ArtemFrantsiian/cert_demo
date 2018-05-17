import React, { Component } from 'react';
import googleAuth from './googleauth.png';

class GoogleAuthLogo extends Component {
  render() {
    return (
      <React.Fragment>
        <img src={googleAuth} width="50px" alt="Google Authenticator" />
        <p>Google Authenticator</p>
      </React.Fragment>
    )
  }
}

export default GoogleAuthLogo;
