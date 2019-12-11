import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Text
} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Client from '../API/Client'

export default class PinCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: ''
        }
        this.verfiyPin = this.verfiyPin.bind(this);
        this.resendCode = this.resendCode.bind(this)
    }
    componentDidMount() {

    }
    verfiyPin() {
        const { navigation } = this.props;
        let phone = navigation.getParam('phone', '+96278000000000');
        Client.patch('account/verify/phone',{ 
            "phone":phone,
            "code":parseInt(this.state.pin)
        }).then((res)=>{
        this.props.navigation.navigate('Reg',{
            itemId: 1,
            phoneid: res.phoneId,
          })
        }).catch((err)=>{
            console.log(err)
        })
    }

    resendCode () {
        Client.patch('/verify/resend',{ 
            "phone":"+962785311634",
            "code":parseInt(this.state.pin)
        }).then((res)=>{
        
        })
    }
    render() {
        let {pin} = this.state
        return (
            <ImageBackground style={styles.imgBackground}
                resizeMode='cover'
                source={require('../../assets/images/background.png')}>
                <View style={styles.Header}>
					<Image style={styles.image} source={require('../../assets/images/phone_code.png')}></Image>
					<Text style={styles.subText}>Enter The Received Code</Text>	
                    <Text style={{color:"#707070", marginTop:20}}>You didn’t receive the code yet?!</Text>
                    <TouchableOpacity
                         style={{marginTop:20}}
                        onPress={this.resendCode}
                    >
                        <Text style={{ color: '#70B32F' , marginTop:10}}> Click here </Text>
                    </TouchableOpacity>
				</View>
                <View style={styles.containerView}>
                    <SmoothPinCodeInput
                        codeLength={5}
                        cellStyle={{
                            borderBottomWidth: 2,
                            borderColor: 'gray',
                        }}
                        cellStyleFocused={{
                            borderColor: 'black',
                        }}
                        value={pin}
                        onTextChange={pin => this.setState({ pin })}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.verfiyPin}
                    >
                        <Text style={{ color: 'white' }}> Continue </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image:{
		paddingLeft:80,
		paddingTop:20,
		width:50,
		height:75
    },
    Header:{
		marginTop:200,
		height:200,
		justifyContent: 'center',
    	alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		width:'100%'
		
	},
    subText:{
		color:"#00164F",
		marginTop:20,
		fontSize:20,
	},	
    button: {
        borderRadius:10,
        width: '100%',
        padding: 40,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: '#00164F',
        padding: 10,
    },
    underLine: {
        width: '100%',
        paddingTop: 10,
        height: 0,
        borderBottomColor: '#70B32F',
        borderBottomWidth: 1
    },
    containerView: {  justifyContent: 'center', alignItems: 'center', padding: 40, paddingTop:0 },
    logo: {
        flex: 1,
        position: 'absolute',
        top: 0,
        width: '100%',
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    logInCompStyl: {
        height: 0
    }
});