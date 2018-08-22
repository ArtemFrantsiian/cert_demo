import React, { Component } from 'react';

import './style.scss';

import cn from "classnames";
import { Input, Button } from 'antd';

class GoogleAuthForm extends Component {

  state = {
    value: "",
    error: "",
    isLoading: this.props.isLoading
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
      })

    } else {
      this.setState({
        error: "",
        isLoading: false,
        value,
      })
    }
  };

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };


  onClick = e => {
    e.preventDefault();
    this.toggleLoading();
    const value  = this.state.value;
    if (!value) {
      this.setState({
        error: "Code must be 6 symbols and only numeric",
      });
      return;
    }
    this.props.onSuccess(value);
    this.toggleLoading();
  };

  render() {
    const { buttonName } = this.props;
    const { value, error, isLoading } = this.state;
    return (

        <div className={cn("ga__verify", { "has-error": error })}>
          <div>Please enter code:</div>
          <Input
            className="ga__input"
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
    )
  }

}

export default GoogleAuthForm;
