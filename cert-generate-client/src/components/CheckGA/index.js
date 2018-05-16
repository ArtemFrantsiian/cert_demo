import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import { login } from "../../actions";
import api from "../../config/api";
import { secret } from "../../config";

import { GoogleAuthForm } from '../GoogleAuth';

class CheckGA extends Component {

  constructor(props) {
     super(props)
     this.state = {
       isLoading: false,
       value: "",
       error: ""
     };
 }

 newState = data => {
   this.setState(data);
 }

 onSuccess = async () => {
   const { value } = this.state;
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
    return (
    <GoogleAuthForm
      name={this.props.name}
      buttonName={this.props.buttonName}
      value={this.state.value}
      isLoading={this.state.isLoading}
      error={this.state.error}
      newState={this.newState}
      onSuccess={this.onSuccess}
    />
    )
  }
}

export default withRouter(connect(null, { login })(CheckGA));
