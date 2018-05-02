import React, { Component } from 'react';
import { rsa, pki, pkcs12, asn1, util } from 'node-forge';
import { message } from 'antd';
import { Link } from "react-router-dom";

import { CreateForm, Steps, Login, QRcode } from '../components';
import { register } from '../schemes';
import api from "../config/api";
import {createKeys, createCSR, createLink, createP12} from "../functions";

class Register extends Component {
  state = {
    step: 0,
    csr: "",
    passphrase: "",
    privateKey: ""
  };

  validPassPhrase = {
    length: 10,
    pattern: /^[a-zA-Z0-9 ]*$/
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

  onRegister = values => {
    const { firstName, lastName, email, passphrase = "" } = values;

    // create keys
    const { publicKey, privateKey } = createKeys();

    // create csr
    const csr = createCSR({ publicKey, privateKey, firstName, lastName, email });

    this.setState({
      csr,
      passphrase,
      privateKey
    });
    this.nextStep()
  };

  onQRcode = async (googleSecret, userInput) => {
    const {csr, privateKey, passphrase} = this.state;

    const data = {
      csr,
      secret: googleSecret,
      token: userInput
    };
    console.log(data);

    // create certificate on the server
    const { certificate } = await api.createCertificate({ data });

    // create p12 file
    const p12 = createP12({ privateKey, certificate, passphrase });

    // create download link for p12
    createLink({p12});
    this.nextStep();
  };

  nextStep = () => {
    this.setState(prevState => ({ step: prevState.step + 1 }))
  };

  passPhrase = (item, value, callback) => {
    if (value && (!new RegExp(this.validPassPhrase.pattern).test(value) || value.length < this.validPassPhrase.length)) {
      callback(`Passphrase must have at least ${this.validPassPhrase.length} characters and only numbers and letters are allowed`);
    }
    callback();
  };

  compareToFirstPassPhrase = (item, value, callback) => {
    if (value && value !== this.form.getFieldValue('passphrase')) {
      callback('Two passphrases that you enter is inconsistent!');
    }
    callback();
  };

  render() {
    const { step } = this.state;
    const scheme = register({ passPhrase: this.passPhrase, compareToFirstPassPhrase: this.compareToFirstPassPhrase });

    return (
      <section className="section">
        <div className="holder">
          <h1 className="tac">Register</h1>
          <Steps
            step={step}
            steps={[
              <CreateForm
                layout={{ items: this.formItemLayout }}
                onSubmit={this.onRegister}
                scheme={scheme}
                buttonName="Ok"
                className="form"
                ref={form => this.form = form}
              />,
              <QRcode
                onSubmit={this.onQRcode}
                buttonName="Ok"
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