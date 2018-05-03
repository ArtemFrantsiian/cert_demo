import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';

import { logout } from "../actions";
import api from '../config/api';

class Revoke extends Component {
  revoke = async e => {
    e.preventDefault();
    const { userId, logout } = this.props;
    const data = {
      userId
    };
    await api.revokeCertificate({ data });
    message.success('Your certificate was revoked successfully. You will be redirected to login page', 2, () => {
      logout();
    });
  };

  render() {
    return (
      <div className="section">
        <div className="holder tac">
          <span>Welcome to Revoke Page</span>
          <br />
          <br />
          <Button onClick={this.revoke}>Revoke certificate</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps, { logout })(Revoke);