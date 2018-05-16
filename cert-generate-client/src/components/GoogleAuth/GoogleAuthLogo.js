import React, { Component } from 'react';
import googleAuth from './googleauth.png';

class GoogleAuthLogo extends Component {
  render() {
    const Welcome = () => {
      const {userName} = this.props
      if (userName) {
        return (
            <React.Fragment>
              <div>Hi { userName }!</div>
            </React.Fragment>
        )
      } else {
        return false
      }
    }

    return (
      <React.Fragment>
        <img src={googleAuth} width="50px" alt="Google Authenticator" />
        <p>Google Authenticator</p>

        <Welcome />
      </React.Fragment>
    )
  }
}

export default GoogleAuthLogo;
