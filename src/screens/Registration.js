import React from 'react';
import Registration  from '../components/register';
import {StyleSheet,View,StatusBar,AsyncStorage} from 'react-native';
import Client from '../API/Client'

export default class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading: false
        }
        this.login = false;
    }

    async clickRegister(fname, lname, mobile, email, password) {
      const { navigation } = this.props;
      let data = navigation.getParam('phoneId', null);
        this.setState({loading: true})
        var regData = {
          email:"D@D.com",
          password: "manafG1992@", 
          phoneId:"5db235fe8bc60d1135dcd683"
        }
        Client.post('account/user/create', regData).then((res)=>{
          let profile = 
            {
              "firstName": "David",
              "lastName": "Driver",
              "userId": res.data.user._id
            }
            Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
            Client.post(`account/user/driver/profile`,profile).then((res)=>{
            this.props.navigation.navigate('Login')
          })
        }).catch((res)=>{
        })
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