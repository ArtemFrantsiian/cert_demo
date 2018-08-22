import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Icon, message } from 'antd';

import { hostRequestCert } from "../config";
import { CheckGA } from "../components";

class Login extends Component {
  constructor(props) {
    super(props);
    let isOk = 'start';
    let name = "";
    let userId = "";
    let ga = "";
    const query = window.location.href.split('?');
    if (query.length >= 2){
      isOk = query[1].split("&")[0].split('=')[1] === "true";
      name = query[1].split("&")[1].split('=')[1];
      userId = query[1].split("&")[2].split('=')[1];
      ga = query[1].split("&")[3].split('=')[1] === "true";
    }
    this.state = {
      redirect: false,
      isOk,
      name,
      userId,
      ga,
    };
    window.history.pushState('', '', window.location.href.split('?')[0]);
  }

  componentDidMount() {
    const { isOk, userId } = this.state;
    if (isOk === 'start') {
      return;
    }
    if (!isOk) {
      message.error('You have not a valid certificate, please go to Register Page and create new one', 2);
      return;
    }
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }

  onClick = async e => {
    e.preventDefault();
    window.location.href = hostRequestCert;
  };

  render() {
    const { redirect, isOk, name, ga } = this.state;
    if (redirect) {

      const { from } = this.props.location.state || { from: { pathname: '/' } };

      return (
        <Redirect to={from} />
      )

    } else {
      return (
        <div className="section">
          <div className="holder tac">
            {
              isOk && isOk !== "start" ? <CheckGA name={name} googleAuthCheck={ga} buttonName='Confirm' /> : (
                <Button onClick={this.onClick}>
                  <Icon type="upload" /> Login with certificate
                </Button>
              )
            }
          </div>
        </div>
      );

    }
  }
}

export default Login;
