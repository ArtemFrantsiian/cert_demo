import React, { Component } from 'react';
import { message, Button } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import { login, setGoogleAuth } from "../../actions";
import api from "../../config/api";
import { secret } from "../../config";

import { GoogleAuthForm, GoogleAuthLogo } from '../GoogleAuth';

class CheckGA extends Component {

  state = {
    isLoading: false,
  };


 onSuccess = async (value) => {
   const { googleAuthCheck } = this.props;
   const userId = localStorage.getItem('userId');
   const data = {
     userId,
     token: value,
   };
   console.log(googleAuthCheck);
   if (googleAuthCheck) {
     const { success } = await api.verify2FA({ data });

     if (!success) {
       message.error('Your key does not correspond');
       this.setState({ isLoading: false });
       return;
     }
   }

   const { name, login } = this.props;
   localStorage.setItem('token', jwt.sign({ userId, name }, secret));
   localStorage.removeItem('userId');
   login({ userId, name });
   message.success('You logged in successfully', 1, () => {
     this.props.history.push('/');
   });
 };

  render() {
    const { name, buttonName, googleAuthCheck } = this.props;

    const { isLoading } = this.state;
    return (
      <div className="google-auth">

        <GoogleAuthLogo />
        {name && <div>Hi { name }!</div>}

        {
          googleAuthCheck ? (
            <div className="ga__check">
              <GoogleAuthForm
                buttonName={buttonName}
                isLoading={isLoading}
                onSuccess={this.onSuccess}
              />
            </div>
          ) : (
            <Button
              onClick={this.onSuccess}
            >
              Login
            </Button>
          )
        }

      </div>
    )
  }
}

export default withRouter(connect(null, { login })(CheckGA));
