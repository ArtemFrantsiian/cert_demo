import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./style.scss";
import { login } from "../../actions";
import api from "../../config/api";

class CheckGA extends Component {
  state = {
    isLoading: false,
    value: ""
  };

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };

  onClick = async e => {
    e.preventDefault();
    this.toggleLoading();
    const data = {
      userId: localStorage.getItem('secret'),
      token: this.state.value,
    };
    await api.verify2FA({ data });
    this.toggleLoading();
    const { name, login, certificate } = this.props;
    localStorage.setItem('token', certificate);
    localStorage.setItem('name', name);
    login({ name, certificate });
    message.success('You logged in successfully', 1, () => {
      this.props.history.push('/');
    });
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    })
  };

  render() {
    const { name } = this.props;
    const { value, isLoading } = this.state;
    return(
      <div className="checkGA tac">
        <div>Hi {name}</div>
        <div>Please enter Google Authenticator</div>
        <Input
          className="checkGA__input"
          value={value}
          onChange={this.onChange}
        />
        <Button
          type="primary"
          onClick={this.onClick}
          loading={isLoading}
          disabled={isLoading}
        >
          Ok
        </Button>
      </div>
    )
  }
}

export default withRouter(connect(null, { login })(CheckGA));