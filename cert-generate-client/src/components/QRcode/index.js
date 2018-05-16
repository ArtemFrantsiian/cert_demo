import React, { Component } from "react";
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';

import { GoogleAuthForm } from '../GoogleAuth';

class QRcode extends Component {

  constructor(props) {
     super(props)

     this.state = {
       imageUrl: "",
       secret: "",
       value: "",
       error: "",
       isLoading: false
     };
 }

 newState = data => {
   this.setState(data);
 }

  async componentDidMount() {
    const secret = speakeasy.generateSecret({name: 'REMME'});
    const data = await QRCode.toDataURL(secret.otpauth_url);
    this.setState({
      imageUrl: data,
      secret: secret
    })
  }

  onSuccess = () => {
    const { secret, value } = this.state;
    const { onSubmit } = this.props;
    onSubmit(secret, value);
  }

  render() {
    return (
    <GoogleAuthForm
      name={this.props.name}
      buttonName={this.props.buttonName}
      imageUrl={this.state.imageUrl}
      value={this.state.value}
      isLoading={this.state.isLoading}
      error={this.state.error}
      newState={this.newState}
      onSuccess={this.onSuccess}
    />
    )
  }
}

export default QRcode;
