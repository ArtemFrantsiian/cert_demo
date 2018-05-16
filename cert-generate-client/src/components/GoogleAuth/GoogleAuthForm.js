import React, { Component } from 'react';
import { GoogleAuthLogo } from './';

import './style.scss';

import cn from "classnames";
import { Input, Button } from 'antd';

class GoogleAuthForm extends Component {

  validQrCode = {
    length: 6,
    pattern: /^[0-9]*$/
  };

  onChange = e => {
    const { value } = e.target;
    if (value && (!new RegExp(this.validQrCode.pattern).test(value) || value.length !== this.validQrCode.length)) {
      this.props.newState({
        error: "Code must be 6 symbols and only numeric",
        isLoading: true,
        value,
      })

    } else {
      this.props.newState({
        error: "",
        isLoading: false,
        value,
      })
    }
  };

  toggleLoading = () => {
    this.props.newState({
      isLoading: !this.props.isLoading,
    })
  };


  onClick = e => {
    e.preventDefault();
    this.toggleLoading();
    const { value } = this.props;
    if (!value) {
      this.setState({
        error: "Code must be 6 symbols and only numeric",
      });
      return;
    }
    this.props.onSuccess();
    this.toggleLoading();
  };

  render() {
    const { name, buttonName, imageUrl, value, isLoading, error } = this.props;
    return (
      <div className="google-auth-form">
        <GoogleAuthLogo userName={name} />
        <div className="qr__check">
          {imageUrl && <img className="qr__code" src={imageUrl} alt="qrcode" />}
          <div className={cn("qr__verify", { "has-error": error })}>
            <div>Please enter code:</div>
            <Input
              className="qr__input"
              value={value}
              onChange={this.onChange}
              onKeyPress={e => e.key === "Enter" ? this.onClick(e) : null}
            />
            {error && <div className="ant-form-explain">{error}</div>}
            <Button
              type="primary"
              onClick={this.onClick}
              loading={isLoading && !error}
              disabled={isLoading}
            >
              { buttonName }
            </Button>
          </div>
        </div>
      </div>
    )
  }

}

export default GoogleAuthForm;
