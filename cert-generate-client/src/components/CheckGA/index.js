import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import cn from "classnames";

import "./style.scss";
import { login } from "../../actions";
import api from "../../config/api";
import { secret } from "../../config";
import { GoogleAuthLogo } from '../index';

class CheckGA extends Component {
  state = {
    isLoading: false,
    value: "",
    error: ""
  };

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

  onClick = async e => {
    e.preventDefault();
    this.toggleLoading();
    const userId = localStorage.getItem('userId');
    const { value } = this.state;
    if (!value) {
      this.setState({
        error: "Code must be 6 symbols and only numeric",
      });
      return;
    }
    const data = {
      userId,
      token: value,
    };
    const { success } = await api.verify2FA({ data });
    this.toggleLoading();

    if (!success) {
      message.error('Your key does not correspond');
      return;
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
    const { name } = this.props;
    const { value, isLoading, error } = this.state;
    return(
      <div className="checkGA tac">
        <GoogleAuthLogo />
        <div>Hi { name }</div>
        <div>Please enter your code</div>
        <div className={cn({ "has-error": error })}>
          <Input
            className="checkGA__input"
            value={value}
            onChange={this.onChange}
            onKeyPress={e => e.key === "Enter" ? this.onClick(e) : null}
          />
          {error && <div className="ant-form-explain">{error}</div>}
        </div>
        <Button
          type="primary"
          onClick={this.onClick}
          loading={isLoading && !error}
          disabled={isLoading}
        >
          Ok
        </Button>
      </div>
    )
  }
}

export default withRouter(connect(null, { login })(CheckGA));