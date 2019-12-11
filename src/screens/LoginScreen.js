import React, { Component } from 'react';
import { 
    StyleSheet,
    View,             
    Image,
    ImageBackground,
    Button
  } from 'react-native';
import { LoginComponent, Background, ForgotPassModal} from '../components';
import Client from '../API/Client';
import {AsyncStorage} from 'react-native';



export default class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
          email:'m@m.com',
          password:'1312321312312',
          emailValid:true,
          passwordValid:true,
          showForgotModal:false,
          emailerror:null
      }
    }

    closeModal(){ 
        this.setState({ showForgotModal: false })
    }

    //go to register page
    onPressRegister() {
        this.props.navigation.navigate('Reg');
    }

    //forgot password press
    forgotPassPress() {
        this.setState({showForgotModal:true})
    }
    
    onPressForgotPass(email) {
            this.setState({showForgotModal:false},()=>{
              setTimeout(() => {
                  alert('A Password Reset Link sent to your email please check and reset your New Password')        
              }, 600);
          });
        
    }

    async onPressLogin(email, password){
      let logData = {
        // "email":"D@D.com",
        // "password":"manafG1992@"
          "email":"driver@mailinator.com",
          "password":"hash-this"
      }
      Client.post('account/users/login', logData).then((res)=>{
        debugger
         AsyncStorage.setItem('Token', res.data.token);
         AsyncStorage.setItem('userID',res.data.userProfile.id)
        Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        let loc={
          "location":{
            "lat": 31.963158,
            "lng": 35.930359
        }
        }
        this.props.navigation.navigate('DriverTripAccept')
        // Client.post('account/user/location', loc).then((resault)=>{
        //   
        // }).catch((res)=>{
        //   debugger
        // });
       
        
      }).catch((res)=>{
      })
    }
   
  render() {
    return (
      <ImageBackground style={[styles.imgBackground, { paddingTop: 240 }]}
      resizeMode='cover'
      source={require('../../assets/images/login.png')}>
            <View style={styles.logInCompStyl}/>
            <View style={styles.containerView}>
              <LoginComponent
                complexity={'any'}
                onPressRegister={()=>{this.onPressRegister()}} 
                onPressLogin={(email, password)=>this.onPressLogin(email, password)} 
                onPressForgotPassword={()=>{this.forgotPassPress()}}
              />
            </View>

            <ForgotPassModal
                modalvisable={this.state.showForgotModal}
                requestmodalclose={()=>{this.closeModal()}}

                inputEmail={this.state.email}
                emailerrorMsg={this.state.emailerror}
                onChangeTextInput={(value)=>{this.setState({emailerror:null,email:value})}}  
                onPressForgotPass={(email)=>this.onPressForgotPass(email)} 
            />

        </ImageBackground>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
},
    containerView: {flex: 1, justifyContent:'center', alignItems:'center'},
    logo:{
        flex:1,
        position:'absolute',
        top:80,
        width:'100%',
        justifyContent:"flex-end",
        alignItems:'center'      
    },
    logInCompStyl:{
        height: 100
    }
});