import React from 'react';
import Registration  from '../components/register';
import {StyleSheet,View,StatusBar,AsyncStorage} from 'react-native';
import Client from '../API/Client'

export default class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading: false,
        }
        this.login = false;
    }

    async clickRegister(fname, lname, mobile, email, password) {
      console.log(fname, lname, mobile,email,password)
         this.props.navigation.navigate('PinCodeScreen', {
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          mobile: mobile,
        });
    }

  
    
  render() {
    return (
        <View style={styles.containerView}>
            <Registration complexity={'any'} onPressRegister={(fname, lname, mobile, email, password)=>this.clickRegister(fname, lname, mobile, email, password)}  onPress={()=>{this.clickRegister()}} onPressBack={()=>{this.props.navigation.goBack()}} loading={this.state.loading}></Registration>
        </View>
    );
  }
}
//marginTop: StatusBar.currentHeight
const styles = StyleSheet.create({
    containerView:{ flex:1, width:"100%", height:"100%" },
    textContainer:{textAlign:"center"},
});