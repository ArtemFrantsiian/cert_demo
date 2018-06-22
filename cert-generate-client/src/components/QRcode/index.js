import React, {Component, Fragment} from "react";
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import { connect } from "react-redux";
import { Checkbox, Button } from "antd";

import { GoogleAuthForm, GoogleAuthLogo } from '../GoogleAuth';
import { setGoogleAuth } from "../../actions";

class QRcode extends Component {
  state = {
   imageUrl: "",
   secret: ""
  };

  async componentDidMount() {
    const secret = speakeasy.generateSecret({name: 'REMME'});
    const data = await QRCode.toDataURL(secret.otpauth_url);
    this.setState({
      imageUrl: data,
      secret: secret
    })
  }

  onSuccess = (value) => {
    const { secret } = this.state;
    const { onSubmit } = this.props;
    onSubmit(secret, value);
  };

  render() {
    const { imageUrl } = this.state;
    const { buttonName, googleAuthCheck, setGoogleAuth } = this.props;
    return (
    <div className="google-auth">
      <GoogleAuthLogo />
      <Checkbox
        checked={googleAuthCheck}
        onChange={() => setGoogleAuth({ check: !googleAuthCheck })}
      >Ask 2 FA</Checkbox>
      {
        googleAuthCheck ? (
          <Fragment>
            <div className="ga__check">
              {imageUrl && <img className="ga__code" src={imageUrl} alt="qrcode" />}
              <GoogleAuthForm
                buttonName={buttonName}
                onSuccess={this.onSuccess}
              />
            </div>
          </Fragment>
        ) : (
          <Button
            onClick={this.onSuccess}
          >Skip 2 FA</Button>
        )
      }
    </div>
    )
  }
}

export default connect((state) => ({
  googleAuthCheck: state.googleAuth.check
}), { setGoogleAuth })(QRcode);
