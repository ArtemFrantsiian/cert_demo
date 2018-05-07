import React, { Component } from "react";
import { Input, Button } from 'antd';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import cn from "classnames";

import './style.scss';
import { GoogleAuthLogo } from '../index';

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

  validQrCode = {
    length: 6,
    pattern: /^[0-9]*$/
  };

  onChange = e => {
    const { value } = e.target;
    if (value && (!new RegExp(this.validQrCode.pattern).test(value) || value.length !== this.validQrCode.length)) {
      this.setState({
        error: "Code must be 6 symbols and only numeric",
        isLoading: true,
        value,
      });
    } else {
      this.setState({
        error: "",
        isLoading: false,
        value,
      })
    }
  };

  onClick = e => {
    e.preventDefault();
    this.toggleLoading();
    const { secret, value } = this.state;
    if (!value) {
      this.setState({
        error: "Code must be 6 symbols and only numeric",
      });
      return;
    }
    const { onSubmit } = this.props;
    onSubmit(secret, value);
    this.toggleLoading();
  };

  render() {
    const { buttonName } = this.props;
    const { imageUrl, value, isLoading, error } = this.state;
    return (
      <div className="qr">
        <GoogleAuthLogo />
        <div className="qr__check">
          {imageUrl && <img className="qr__code" src={imageUrl} alt="qrcode" />}
          <div className={cn("qr__verify", { "has-error": error })}>
            <div className="qr__label">QR code</div>
            <Input
              className="qr__input"
              value={value}
              onChange={this.onChange}
              onKeyPress={e => e.key === "Enter" ? this.onClick(e) : null}
            />
            {error && <div className="ant-form-explain">{error}</div>}
          </div>
        </div>
        <Button
          type="primary"
          onClick={this.onClick}
          className="qr__button"
          loading={isLoading && !error}
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