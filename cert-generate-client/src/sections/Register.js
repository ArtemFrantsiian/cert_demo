import React, { Component } from 'react';
import { message, Spin } from 'antd';
import { Link } from "react-router-dom";
import Remme from 'remme';
import { connect } from 'react-redux';

import { CreateForm, Steps, QRcode, KeyStore } from '../components';
import { register } from '../schemes';
import api from "../config/api";
import { nodeAddress, socketAddress } from "../config";
import { createLink, createP12 } from "../functions";
import { pki } from "node-forge";

class Register extends Component {
  state = {
    step: 0,
    creating: false,
    certificate: {},
    privateKey: "",
    passphrase: "",
  };

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: {
        span: 4,
        offset: 5
      },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  destroyClickedElement = (event) => {
    document.body.removeChild(event.target);
  };

  onRegister = (values) => {
    const { firstName, lastName, email, passphrase = "" } = values;
    const { privateKey: privateKeyHex } = this.props;

    this.setState({
      creating: true
    }, async () => {

      const remme = new Remme.Client({
        privateKeyHex,
        nodeAddress,
        socketAddress,
      });

      const balance = await remme.token.getBalance(remme.account.publicKeyHex);

      if (balance < 10) {
        message.error('You do not have enough tokens for creating certificate');
        return;
      }

      const certificateTransactionResult = await remme.certificate.createAndStore({
        commonName: firstName,
        email: email,
        name: firstName,
        surname: lastName,
        countryName: "US",
        validity: 360
      });

      const { certificate } = certificateTransactionResult;
      const { privateKey } = certificate;

      this.setState({
        creating: false,
        certificate,
        privateKey,
        passphrase,
      });

      this.nextStep()
    });
  };

  onQRcode = async (googleSecret, userInput) => {
    const {
      certificate,
      privateKey,
      passphrase,
    } = this.state;

    console.log(certificate);

    const data = {
      certificate: pki.certificateToPem(certificate),
      secret: googleSecret,
      token: userInput
    };

    console.log(data);

    const { notValid } = await api.register({ data });
    if (notValid) {
      message.error('Your key does not correspond');
      return;
    }

    // create p12 file
    const p12 = createP12({ certificate, privateKey, passphrase });

    // create download link for p12
    createLink({p12});
    this.nextStep();
  };

  nextStep = () => {
    this.setState(prevState => ({ step: prevState.step + 1 }))
  };


  compareToFirstPassPhrase = (item, value, callback) => {
    if (value && value !== this.form.getFieldValue('passphrase')) {
      callback('Two passphrases that you enter is inconsistent!');
    }
    callback();
  };

  render() {
    const { step, creating } = this.state;
    const scheme = register({ compareToFirstPassPhrase: this.compareToFirstPassPhrase });
    return (
      <section className="section">
        <div className="holder">
          <h1 className="tac">Register</h1>
          <Steps
            step={step}
            steps={[
              <KeyStore
                onSubmit={this.nextStep}
              />,
              <Spin
                spinning={creating}
                tip={"Creating..."}
                style={{left: 0}}
              >
                <CreateForm
                  layout={{ items: this.formItemLayout }}
                  onSubmit={this.onRegister}
                  scheme={scheme}
                  buttonName="Create User"
                  className="form"
                  ref={form => this.form = form}
                />
              </Spin>,
              <QRcode
                onSubmit={this.onQRcode}
                buttonName="Confirm"
              />,
              <div>
                <div>Your certificate was registered successfully</div>
                <Link to='/login'>Login</Link>
              </div>
            ]}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  privateKey: state.keyStore.privateKey,
});

export default connect(mapStateToProps)(Register);
