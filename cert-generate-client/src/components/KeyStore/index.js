import React, { Component, Fragment } from "react";
import { Upload, Button, Icon} from 'antd';
import { connect } from 'react-redux';

import { saveKeyStore } from '../../actions'; 

class KeyStore extends Component {
  state = {
    isLoading: false,
  };

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };

//   render(){
//       return (
//         <Upload>
//             <Button>
//                 <Icon type="upload" /> Upload your REMChain keystore file 
//             </Button>
//         </Upload>
//       )
//   }
  handleClick = (e) => {
    e.preventDefault();
    this.props.saveKeyStore({privateKey: "asd"});
  }

  render(){
      const { privateKey } = this.props
      return(
            <Fragment>
                <Button onClick={this.handleClick}>Set Priv jey</Button>
                <p>{privateKey}</p>
            </Fragment>          
      )
  }
}
const mapStateToProps = (state) => ({privateKey: state.keyStore.privateKey})
export default connect(mapStateToProps, {saveKeyStore})(KeyStore);