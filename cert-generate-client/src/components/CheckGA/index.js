import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import { login } from "../../actions";
import api from "../../config/api";
import { secret } from "../../config";

import { GoogleAuthForm, GoogleAuthLogo } from '../GoogleAuth';

class CheckGA extends Component {

  state = {
    isLoading: false,
  };


 onSuccess = async (value) => {
   const userId = localStorage.getItem('userId');
   const data = {
     userId,
     token: value,
   };
   const { success } = await api.verify2FA({ data });

   if (!success) {
     message.error('Your key does not correspond');
     this.setState({ isLoading: false })
     return;
   }

   const { name, login } = this.props;
   localStorage.setItem('token', jwt.sign({ userId, name }, secret));
   localStorage.removeItem('userId');
   login({ userId, name });
   message.success('You logged in successfully', 1, () => {
     this.props.history.push('/');
   });
 }

  render() {
    const { name, buttonName } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="google-auth">
        <GoogleAuthLogo />
        {name && <div>Hi { name }!</div>}

        <div className="ga__check">
          <GoogleAuthForm
            buttonName={buttonName}
            isLoading={isLoading}
            onSuccess={this.onSuccess}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, { login })(CheckGA));
