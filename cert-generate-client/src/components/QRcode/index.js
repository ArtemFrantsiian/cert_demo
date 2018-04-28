import React, { Component } from "react";
import { Input, Button, message } from 'antd';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';

import './style.scss';

class QRcode extends Component {
  state = {
    imageUrl: "",
    secret: "",
    value: "",
    error: "",
    isLoading: false
  };

  async componentDidMount() {
    const secret = speakeasy.generateSecret({name: 'REMME'});
    const data = await QRCode.toDataURL(secret.otpauth_url);
    console.log(data);
    this.setState({
      imageUrl: data,
      secret: secret
    })
  }

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    })
  };

  onClick = e => {
    e.preventDefault();
    this.toggleLoading();
    const { secret, value } = this.state;
    // if (!verifySecret(secret, value)) {
    //   message.error('Your value do not match with qr code');
    //   return;
    // }
    const { onSubmit } = this.props;
    onSubmit(secret, value);
    this.toggleLoading();
  };

  render() {
    const { buttonName } = this.props;
    const { imageUrl, secret, value, isLoading } = this.state;
    console.log(secret, value);
    return (
      <div className="qr">
        <div className="qr__check">
          {imageUrl && <img className="qr__code" src={imageUrl} />}
          <div className="qr__verify">
            <div className="qr__label">QR code</div>
            <Input
              className="qr__input"
              value={value}
              onChange={this.onChange}
            />
          </div>
        </div>
        <Button
          type="primary"
          onClick={this.onClick}
          className="qr__button"
          loading={isLoading}
          disabled={isLoading}
        >
          { buttonName }
        </Button>
      </div>
    )
  }
}
//{components["String"]({ value, onChange: this.onChange })}
export default QRcode;