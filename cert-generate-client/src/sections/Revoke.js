import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import Remme from "remme";

import { KeyStore } from "../components";
import { logout } from "../actions";
import api from '../config/api';
import { networkConfig } from "../config";

class Revoke extends Component {
  revoke = async () => {
    const { userId, privateKey: privateKeyHex, logout } = this.props;
    const { certificate } = await api.getCertificate(userId);

    const remme = new Remme.Client({
      privateKeyHex,
      networkConfig,
    });

    await remme.certificate.revoke(certificate);

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
          <KeyStore
            onSubmit={this.revoke}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  privateKey: state.keyStore.privateKey,
});

export default connect(mapStateToProps, { logout })(Revoke);