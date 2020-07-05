import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';
import Client from '../API/Client';
import axios from 'axios';

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ 
      new: true
    }
    this.token =false;
  }

  componentDidMount(){
    this.checkValidToken()
  }

  checkValidToken = () => {
    AsyncStorage.getAllKeys().then((key) => {
      debugger
      if (!key.length) {
        this.props.navigation.navigate('Reg')
      }
      key.forEach(k => {
        debugger
        if(k=='MobileNumber'){
          AsyncStorage.getItem(k).then((mobileNumber) => {
            debugger
            this.setState({new : false});
            if(this.token) return;
            Client.post('account/phone/verify/create', {
              "phone":"+962"+mobileNumber,
              "userType": "DRIVER"
              })
              .then( (res) =>{
                debugger
                  if(res.data !== "Success resent verify code!") {
                    this.props.navigation.navigate('UploadDocs',{
                      phoneId: res.data.phoneId
                    });
                  } else {
                    this.props.navigation.navigate('PinCodeScreen',{
                      itemId: 1,
                      phoneId: mobileNumber
                      }).catch((err)=>{
                        console.log(err)
                      })
                  }
              })
          })
         
        }
        if (k == "Token") {
          AsyncStorage.getItem(k).then((token) => {
            debugger
            if(!token){
              this.props.navigation.navigate('UploadDocs');
            }
            else {
              this.token =true;
              Client.defaults.headers['Authorization'] = `Bearer ${token}`;
                AsyncStorage.setItem('Token', token);
                this.props.navigation.navigate('DriverTripAccept')
            }
            // axios.get(`http://api.ibshr.com/api/account/is-valid`, {
            //   headers: {
            //     Accept: 'application/json;charset=UTF-8',
            //     Authorization: `Bearer ${token}`
            //   }
            // }).then((res)=>{
            //   debugger
            //   if(res.data.isValidToken) {
            //     this.setState({new:false})
                
            //   }else {
               
            //   }
            // }).catch((res)=>{
            //   debugger
            //     this.refreshToken(tokeniz)
            // })
          })
        }
        AsyncStorage.getItem(k);
      })


      // axios.post(`account/is-valid`,{
      //   headers: {
      //     Accept: 'application/json;charset=UTF-8',
      //     Authorization: `Bearer ${token}`
      // }
      // })
    }).done((res)=>{
      // if(!this.state.new) {
      //   this.props.navigation.navigate('UploadDocs');
      // }else {
      //   this.props.navigation.navigate('Reg')
      // }
    });
  };
  refreshToken(token) {
    debugger
    axios.get(`http://api.ibshr.com/api/account/refresh-token`,{
                headers: {
                  Accept: 'application/json;charset=UTF-8',
                  Authorization: `Bearer ${token}`
                }
              }).then((res)=>{
                debugger
                AsyncStorage.setItem('Token', res.data.token);
                Client.defaults.headers['Authorization'] = `Bearer ${token}`;
                this.props.navigation.navigate('DriverTripAccept')
              }) .catch ((res)=>{
                debugger
              })
  }
  render() {
    return (
      <View style={styles.IndicatorStyle}>
        <ActivityIndicator />
      </View>
    );
  }
}

//style for this component
const styles = StyleSheet.create({
  IndicatorStyle:{
    flex:1, 
    justifyContent:"center"
  }
})