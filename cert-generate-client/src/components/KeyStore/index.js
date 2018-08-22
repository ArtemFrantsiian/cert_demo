import React, { Component } from "react";
import { Upload, Button, Icon} from 'antd';
import { connect } from 'react-redux';
import { message } from "antd";

import { saveKeyStore } from '../../actions';

class KeyStore extends Component {
  state = {
    isLoading: false,
  };

  fileReader = ({ data, file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const { saveKeyStore, onSubmit } = this.props;
        const { privateKey } = JSON.parse(reader.result);
        saveKeyStore({ privateKey });
        onSubmit();
      } catch (e) {
        message.error('Your file is not a valid');
      }
    };
    reader.readAsText(file);
  };

  render(){
      return (
        <Upload
          customRequest={this.fileReader}
        >
            <Button>
                <Icon type="upload" /> Upload your REMChain keystore file
            </Button>
        </Upload>
      )
  }
}

const mapStateToProps = (state) => ({
  privateKey: state.keyStore.privateKey,
});

export default connect(mapStateToProps, { saveKeyStore })(KeyStore);