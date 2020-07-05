import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Text
} from 'react-native';
import ErrMessage from '../API/ErrMeassage'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Client from '../API/Client'

export default class PinCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: '',
            phone: null,//his.props.navigation.navigation.getParam('mobile', '*********'),
            phoneId: null
        }
        this.verfiyPin = this.verfiyPin.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.handleClose= this.handleClose.bind(this)

    }

    componentDidMount() {
        debugger
        const { navigation } = this.props;
        let phone = navigation.getParam('mobile', '*********');
        phone =  phone.substring(1)
        phone = '+962' + phone;
        this.setState({ phone: phone }, () => {
            this.verfiyPhone()
        })
    }

    handleClose () {
        this.setState({showErr:false, errMeassage:''})
      }
    verfiyPin() {
        console.log('state', this.state.phone)
        Client.patch('account/verify/phone', {
            "phone": this.state.phone,
            "code": this.state.pin
        }).then((res) => {
            debugger
            console.log(res)
            this.setState({phoneId: res.data.phoneId},()=>{
                this.registerUser(this.state.phoneId)
            })
            
        }).catch((res) => {
            this.setState({showErr:true , errMeassage: res.response.data.error.message})
        })
    }

    registerUser(phoneId) {
        debugger
        const { navigation } = this.props;
        let fname = navigation.getParam('fname', 'NAME');
        let lname = navigation.getParam('lname', 'NAME');
        let email = navigation.getParam('email', 'NAME@name.com');
        let password = navigation.getParam('password', '*********');
        let regData = {
            email: email,
            password: 'manafG1992@',
            phoneId: phoneId
        }
        console.log('regData',regData)
        Client.defaults.headers['Authorization'] = "";
        debugger
        let self= this;
        Client.post('account/user/create', regData).then((res) => {
            debugger
            AsyncStorage.setItem('Token', `${res.data.token}`);
            Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
            let profile =
            {
                "firstName": fname,
                "lastName": lname,
                "userId": res.data.user._id
            }
             let self2 = self;
            Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
            Client.post(`account/user/profile`, profile).then((res) => {
                debugger
                AsyncStorage.setItem('MobileNumber', `${self2.state.phone}`);
                console.log(res)
                AsyncStorage.setItem('userID', res.data.user.id)
                AsyncStorage.setItem('Profile', res.data.user)
                this.props.navigation.navigate('UploadDocs')
            }).catch((res)=>{
                debugger
                this.setState({showErr:true , errMeassage: res.response.data.error.message})
            })
        }).catch((res) => {
            debugger
            this.setState({showErr:true , errMeassage: res.response.data.error.message})

        })
    }

    verfiyPhone() {
        debugger
        console.log('state', this.state.phone)
        let self =this;
        Client.post('account/phone/verify/create', {
            "phone": this.state.phone,
            "userType": "DRIVER"
        })
            .then((res) => {
                debugger
                if (res.data) {
                    this.state.phoneId = res.data.phoneId;
                    this.registerUser(res.data.phoneId)
                } else {

                }
            }).catch((res)=>{
                this.setState({showErr:true , errMeassage: res.response.data.error.message})

            })
    }

    resendCode() {
        Client.patch('/verify/resend', {
            "phone": this.state.phone,
        }).then((res) => {
            this.setState({showErr:true , errMeassage: res.response.data.error.message})

        })
    }

    handleClose () {
        this.setState({showErr:false, errMeassage:''})
      }


    render() {
        let { pin } = this.state
        return (
            <View style={styles.backGround}>
            {this.state.showErr &&
                    <ErrMessage message={this.state.errMeassage} handleClose={this.handleClose}  showErr = {this.state.showErr}/>
            }
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ zIndex: 999, position: 'absolute', top: 40, left: 20 }}>
					<Icon name='ios-arrow-back' type="ionicon"color='#000'  />
                </TouchableOpacity>
                <View style={styles.Header}>
                    <Text style={styles.subText}>Phone Verify</Text>
                    <Text style={{ color: "#0D1C60", marginTop: 20, fontSize: 16, width: '50%', textAlign: 'center' }}>We sent code to verify your phone</Text>

                    <Text style={{ color: '#7F7F7F', marginTop: 20 }}> Sent to {this.state.phone}</Text>

                </View>
                <View style={styles.containerView}>
                    <SmoothPinCodeInput
                        codeLength={6}
                        onFulfill={this.verfiyPin}
                        cellStyleFocused={{
                            borderColor: 'black',
                        }}
                        value={pin}
                        onTextChange={pin => this.setState({ pin })}
                    />
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={this.verfiyPin}
                    >
                        <Text style={{ color: 'white' }}> Verify & Continue </Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: "#E0E1E3",
        flex: 1
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        paddingLeft: 80,
        paddingTop: 20,
        width: 50,
        height: 75
    },
    Header: {
        marginTop: 90,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'

    },
    subText: {
        color: "#000",
        fontWeight: 'bold',
        fontSize: 20,
        fontSize: 20,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        padding: 20,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: '#00164F',
    },
    underLine: {
        width: '100%',
        paddingTop: 10,
        height: 0,
        borderBottomColor: '#70B32F',
        borderBottomWidth: 1
    },
    containerView: { justifyContent: 'center', alignItems: 'center', padding: 40, paddingTop: 0 },
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