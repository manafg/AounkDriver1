import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';
 
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
 
import { 
  Ionicons
} from '@expo/vector-icons';

export default class ErrMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: props.showErr,
            iconName:null
          }
    }
    
   
   componentDidMount(){
     this.setIconName();
   }
    
    setIconName () {
      switch(this.props.type) {
        case "info" :
          this.setState({
            iconName:"ios-information-circle"
          })
          break;
        case "danger":
          this.setState({
            iconName:"ios-close-circle"
          })
          break;
          case "success":
          this.setState({
            iconName:"ios-checkmark-circle"
          })
          break;
        default:
          this.setState({
            iconName:"ios-close-circle"
          })
          break;
      }
    }

    handleCloseInner(){
      this.props.handleClose(this.props.factor)
    }

    render() {

      let message = this.props.message == "Unauthorized" ? "Make sure to upload required docs from menu, and wait to be verified from the admin " : this.props.message;
      return (
          <SCLAlert
            show={this.state.show}
            onRequestClose={this.handleClose}
            theme={this.props.type ?  this.props.type : "danger"}
            title="Aounk"
            subtitle={message}
            headerIconComponent={<Ionicons name={this.state.iconName} size={32} color="white" />}
          >
            <SCLAlertButton theme={this.props.type ?  this.props.type : "danger"} onPress={this.handleCloseInner}>Done</SCLAlertButton>
            {/* <SCLAlertButton theme="default" onPress={this.handleClose}>Cancel</SCLAlertButton> */}
          </SCLAlert>
      );
    }
  }
   
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });




//export default errMessage;