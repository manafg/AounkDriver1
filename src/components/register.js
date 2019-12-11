import React from 'react';
import { View, ImageBackground, Text, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image, TouchableWithoutFeedback, LayoutAnimation, Platform } from 'react-native';
import Background from './Background';
import { Icon, Button, Header, Input, CheckBox } from 'react-native-elements'
import { colors } from '../common/theme';

var { height } = Dimensions.get('window');

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            check:false,
            email: '',
            mobile: '',
            phoneId: '',
            password: '',
            confPassword: '',
            mobileValid: true,
            emailValid: true,
            fnameValid: true,
            lnameValid: true,
            passwordValid: true,
            cnfPwdValid: true,
            pwdErrorMsg: ''
        }
    }

    // first name validation
    validateFirstName() {
        const { fname } = this.state
        const fnameValid = fname.length > 0
        LayoutAnimation.easeInEaseOut()
        this.setState({ fnameValid })
        fnameValid || this.fnameInput.shake();
        return fnameValid
    }

    // last name validation
    validateLastname() {
        const { lname } = this.state
        const lnameValid = lname.length > 0
        LayoutAnimation.easeInEaseOut()
        this.setState({ lnameValid })
        lnameValid || this.lnameInput.shake();
        return lnameValid
    }

    // mobile number validation
    validateMobile() {
        // const { mobile } = this.state
        // const mobileValid = (mobile.length == 10)
        // LayoutAnimation.easeInEaseOut()
        // this.setState({ mobileValid })
        // mobileValid || this.mobileInput.shake();
        return true
    }

    // email validation
    validateEmail() {
        const { email } = this.state
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailValid = re.test(email)
        LayoutAnimation.easeInEaseOut()
        this.setState({ emailValid })
        emailValid || this.emailInput.shake()
        return emailValid
    }

    // password validation
    validatePassword() {
        const { complexity } = this.props
        const { password } = this.state
        const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
        const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
        if (complexity == 'any') {
            var passwordValid = password.length >= 1;
            this.setState({ pwdErrorMsg: "Password can't be blank" })
        }
        else if (complexity == 'alphanumeric') {
            var passwordValid = regx1.test(password);
            this.setState({ pwdErrorMsg: 'Password must consists of at least 1 alphanumeric characters and 8-15 length' });
        }
        else if (complexity == 'complex') {
            var passwordValid = regx2.test(password);
            this.setState({ pwdErrorMsg: 'Password must be atleast 1 small-case letter' })
        }
        LayoutAnimation.easeInEaseOut()
        this.setState({ passwordValid })
        passwordValid || this.passwordInput.shake()
        return passwordValid
    }

    // confirm password validation
    validateConfPassword() {
        const { password, confPassword } = this.state;
        const cnfPwdValid = (password == confPassword);
        LayoutAnimation.easeInEaseOut()
        this.setState({ cnfPwdValid })
        cnfPwdValid || this.cnfPwdInput.shake();
        return cnfPwdValid
    }

    //register button press for validation
    onPressRegister() {
        const { onPressRegister } = this.props;
        LayoutAnimation.easeInEaseOut();
        const fnameValid = this.validateFirstName();
        const lnameValid = this.validateLastname();
        // const mobileValid = this.validateMobile();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        const cnfPwdValid = this.validateConfPassword();

        if (emailValid && fnameValid && lnameValid && passwordValid && cnfPwdValid) {
            //register function of smart component
            onPressRegister("", "", "", this.state.email, this.state.password);
            this.setState({ email: '', password: '', confPassword: '' })
        }
    }
    
    agreeCondtionAndTerms() {
        this.setState({
            check:true
        })
    }

    render() {
        const { onPressBack, loading } = this.props
        return (
            <View style={[styles.imgBackground, { paddingTop: 100, backgroundColor: "#E0E1E3" }]}>
                <View style={styles.wraper}>
                    <Text style={styles.h1}>Create Account</Text>
                    <Text style={styles.h2}>Let's start with creating your account</Text>
                </View>
                <ScrollView style={styles.scrollViewStyle}>

                    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : "padding"} style={styles.form}>
                        <View style={styles.containerStyle}>
                            <Text style={{ marginLeft: 47, color: "#7F7F7F" }}>First Name</Text>
                            <View style={styles.textInputContainerStyle}>

                                <Input
                                    ref={input => (this.fnameInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'First Name'}
                                    value={this.state.fname}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text) => { this.setState({ fname: text }) }}
                                    errorMessage={this.state.fnameValid ? null : 'Please enter your first name'}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateFirstName(); this.lnameInput.focus() }}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>
                            <Text style={{ marginLeft: 47, color: "#7F7F7F" }}>Last Name</Text>

                            <View style={styles.textInputContainerStyle}>

                                <Input
                                    ref={input => (this.lnameInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Last Name'}
                                    value={this.state.lname}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text) => { this.setState({ lname: text }) }}
                                    errorMessage={this.state.lnameValid ? null : 'Please enter your last name'}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateLastname(); this.emailInput.focus() }}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>
                            <Text style={{ marginLeft: 47, color: "#7F7F7F" }}>Email</Text>

                            <View style={styles.textInputContainerStyle}>
                                <Input
                                    ref={input => (this.emailInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Email'}
                                    value={this.state.email}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                    errorMessage={this.state.emailValid ? null : 'Please enter a valid email address'}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateEmail(); this.mobileInput.focus() }}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>
                            <Text style={{ marginLeft: 47, color: "#7F7F7F" }}>Password</Text>

                            <View style={styles.textInputContainerStyle}>
                                <Input
                                    ref={input => (this.passwordInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Password'}
                                    value={this.state.password}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                    errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validatePassword(); this.cnfPwdInput.focus() }}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>
                            <Text style={{ marginLeft: 47, color: "#7F7F7F" }}>Confirem Password</Text>

                            <View style={styles.textInputContainerStyle}>
                                <Input
                                    ref={input => (this.cnfPwdInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Confirm Password'}
                                    placeholderTextColor={""}
                                    value={this.state.confPassword}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text) => { this.setState({ confPassword: text }) }}
                                    errorMessage={this.state.cnfPwdValid ? null : 'Password does not match'}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateConfPassword() }}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>
                            <CheckBox
                                containerStyle={{backgroundColor:"#E0E1E3", borderColor:"#E0E1E3"}}
                                onPress={()=>{this.agreeCondtionAndTerms()}}
                                checkedColor={"#72BE44"}
                                title='By signing up, you agree to our Terms & Conditions and Privacy Policy.'
                                checked={this.state.check}
                            />
                            {/* <View style={styles.buttonContainer}> */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this.onPressRegister() }}
                                loading={loading}
                            >
                                <Text style={{ color: 'white' }}> Continue </Text>
                            </TouchableOpacity>
                            {/* </View> */}
                            <View style={styles.gapView} />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
};

const styles = {
    h1: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 16,
        marginTop: 20,
        color: "#0D1C60"
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    headerContainerStyle: {
        backgroundColor: colors.TRANSPARENT,
        borderBottomWidth: 0
    },
    headerInnerContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    inputContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.GREY.default
    },
    textInputStyle: {
        marginLeft: 10,
    },
    iconContainer: {
        paddingTop: 8
    },
    gapView: {
        padding: 40,
        height: 40,
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 40
    },
    registerButton: {
        backgroundColor: colors.SKY,
        width: 180,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        padding: 40,
        marginTop: 30,
        borderRadius: 15,
    },
    buttonTitle: {
        fontSize: 16
    },
    button: {
        width: '80%',
        padding: 20,
        borderRadius: 5,
        marginTop: 40,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#00164F',
    },
    inputTextStyle: {
        color: colors.GREY.default,
        fontSize: 13,
        marginLeft: 0,
        height: 32
    },
    errorMessageStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 0
    },
    containerStyle: {
        flexDirection: 'column',
        marginTop: 20
    },
    form: {
        flex: 1,
    },
    logo: {
        width: '90%',
        justifyContent: "flex-start",
        marginTop: 10,
        alignItems: 'center',
    },
    scrollViewStyle: {
        height: height
    },
    wraper: {
        flexDirection: 'cloumn',
        alignItems: "center",
    },
    textInputContainerStyle: {
        flexDirection: 'column',
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        paddingTop: 7,
        paddingBottom: 7
    },
    headerStyle: {
        fontSize: 18,
        color: colors.GREY.default,
        textAlign: 'center',
        flexDirection: 'row',
        marginTop: 0
    },
}