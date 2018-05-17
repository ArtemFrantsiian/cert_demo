import React, { Component } from "react";
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';

import { GoogleAuthForm, GoogleAuthLogo } from '../GoogleAuth';

class QRcode extends Component {

  state = {
   imageUrl: "",
   secret: ""
  };

  async componentDidMount() {
    const secret = speakeasy.generateSecret({name: 'REMME'});
    const data = await QRCode.toDataURL(secret.otpauth_url);
    this.setState({
      imageUrl: data,
      secret: secret
    })
  }

  onSuccess = (value) => {
    const { secret } = this.state;
    const { onSubmit } = this.props;
    onSubmit(secret, value);
  }

  render() {
    const {imageUrl} = this.state;
    return (
    <div className="google-auth">
      <GoogleAuthLogo />

      <div className="ga__check">
        {imageUrl && <img className="ga__code" src={imageUrl} alt="qrcode" />}
        <GoogleAuthForm
          buttonName={this.props.buttonName}
          onSuccess={this.onSuccess}
        />
      </div>
    </div>
    )
  }
}

export default QRcode;
