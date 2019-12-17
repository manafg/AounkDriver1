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
            pin: '',
            phone: null,//his.props.navigation.navigation.getParam('mobile', '*********'),
            phoneId: null
        }
        this.verfiyPin = this.verfiyPin.bind(this);
        this.resendCode = this.resendCode.bind(this)
    }

    componentDidMount() {
        const { navigation } = this.props;
        let phone = navigation.getParam('mobile', '*********');
        phone.substring(1)
        phone = '+962' + phone;
        this.setState({ phone: phone }, () => {
            this.verfiyPhone()
        })
    }

    verfiyPin() {
        console.log('state', this.state.phone)
        Client.patch('account/verify/phone', {
            "phone": this.state.phone,
            "code": parseInt(this.state.pin)
        }).then((res) => {
            console.log(res)
            this.setState({phoneId: res.data.phoneId},()=>{
                this.registerUser(this.state.phoneId)
            })
            
        }).catch((err) => {
            console.log(err)
        })
    }

    registerUser(phoneId) {
        const { navigation } = this.props;
        let fname = navigation.getParam('fname', 'NAME');
        let lname = navigation.getParam('lname', 'NAME');
        let email = navigation.getParam('email', 'NAME@name.com');
        let password = navigation.getParam('password', '*********');
        let regData = {
            email: email,
            password: password,
            phoneId: phoneId
        }
        console.log('regData',regData)
        Client.defaults.headers['Authorization'] = ""
        Client.post('account/user/create', regData).then((res) => {
            let profile =
            {
                "firstName": fname,
                "lastName": lname,
                "userId": res.data.user._id
            }
            console.log(res)
            Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
            Client.post(`account/user/driver/profile`, profile).then((res) => {
                console.log(res)
                // AsyncStorage.setItem('Token', res.data.token);
                // AsyncStorage.setItem('userID', res.data.userProfile.id)
                // Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;

                this.props.navigation.navigate('UploadDocs')
            })
        }).catch((res) => {
            console.log(res)
        })
    }

    verfiyPhone() {
        console.log('state', this.state.phone)
        Client.post('account/phone/verify/create', {
            "phone": this.state.phone,
            "userType": "DRIVER"
        })
            .then((res) => {
                if (res.data) {
                    this.state.phoneId = res.data;
                } else {

                }
            })
    }

    resendCode() {
        Client.patch('/verify/resend', {
            "phone": this.state.phone,
        }).then((res) => {

        })
    }
    render() {
        let { pin } = this.state
        return (
            <View style={styles.backGround}>
                <View style={styles.Header}>
                    <Text style={styles.subText}>Phone Verify</Text>
                    <Text style={{ color: "#0D1C60", marginTop: 20, fontSize: 16, width: '50%', textAlign: 'center' }}>We sent code to verify your phone</Text>

                    <Text style={{ color: '#7F7F7F', marginTop: 20 }}> Sent to (+962) {this.state.phone}</Text>

                </View>
                <View style={styles.containerView}>
                    <SmoothPinCodeInput
                        codeLength={5}
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