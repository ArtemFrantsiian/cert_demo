import React, { Component, Fragment } from "react";
import { Upload, Button, Icon} from 'antd';
import { connect } from 'react-redux';

import { saveKeyStore } from '../../actions'; 

class KeyStore extends Component {
  state = {
    isLoading: false,
  };

  fileReader = ({ data, file }) => {
    console.log(data, file);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsText(file);
  };

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
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
const mapStateToProps = (state) => ({privateKey: state.keyStore.privateKey})
export default connect(mapStateToProps, {saveKeyStore})(KeyStore);