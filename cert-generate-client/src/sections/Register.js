import React, { Component } from 'react';
import { message } from 'antd';
import { Link } from "react-router-dom";
import Remme from 'remme';
import { connect } from 'react-redux';

import { CreateForm, Steps, QRcode, KeyStore } from '../components';
import { register } from '../schemes';
import api from "../config/api";
import { createLink, createP12 } from "../functions";
import {pki} from "node-forge";

class Register extends Component {
  state = {
    step: 0,
    certificate: "",
    passphrase: "",
    privateKey: ""
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

  onRegister = async (values) => {
    const { firstName, lastName, email, passphrase = "" } = values;

    // create certificate
    // USE USER PRIVATE KEY
    // TODO: MOVE IP CONFIG 
    const remme = new Remme.Client({
      privateKeyHex: "3079e1126e5aa57617c5032cfc148f02686a996987ed3c27ec77f734738a46ad",
      nodeAddress: "178.62.214.39:8080",
      socketAddress: "178.62.214.39:9080"
    });

    //MAYBE DO SOME SPINNER FOR LOADING HERE 
    const certificateTransactionResult = await remme.certificate.createAndStore({
          commonName: firstName,
          email: email,
          name: firstName,
          surname: lastName,
          countryName: "US",
          validity: 360
        }); 

    console.log(certificateTransactionResult);
    const certificate = certificateTransactionResult.certificate;
    const privateKey = certificate.privateKey;   

    this.setState({
      certificate,
      passphrase,
      privateKey
    });
    this.nextStep()
  };

  onQRcode = async (googleSecret, userInput) => {
    const {certificate, privateKey, passphrase} = this.state;

    const data = {
      certificate: pki.certificateToPem(certificate),
      secret: googleSecret,
      token: userInput
    };

    console.log(data);

    // create certificate on the server
    const { notValid } = await api.register({ data });
    if (notValid) {
      message.error('Your key does not correspond');
      return;
    }

    // create p12 file
    const p12 = createP12({ privateKey, certificate, passphrase });

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
    const { step } = this.state;
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
              <CreateForm
                layout={{ items: this.formItemLayout }}
                onSubmit={this.onRegister}
                scheme={scheme}
                buttonName="Create User"
                className="form"
                ref={form => this.form = form}
              />,
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

export default Register;
//
// const mapStateToProps = (state) => ({privateKey: state.keyStore.privateKey});
// export default connect(mapStateToProps)(Register);
