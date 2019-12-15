import React from 'react';
import { View, ImageBackground, Text, Dimensions, ScrollView, KeyboardAvoidingView,AsyncStorage, TouchableOpacity, Image, TouchableWithoutFeedback, LayoutAnimation, Platform } from 'react-native';
import { Icon, Button, Header, Input, CheckBox } from 'react-native-elements'
import { colors } from '../common/theme';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Client from '../API/Client';
import axios from 'axios';



var { height } = Dimensions.get('window');

export default class UploadDocs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicle_image: null,
            vCategory: null,
            driver_license: null,
            personal_id: null,
            vehicle_plate_number: null,
            ncrc: null
        }
        this._pickImage = this._pickImage.bind(this)
    }


    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async (key) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });


        if (!result.cancelled) {
            this._updateImage(key, result)
        }
    };

    UploadDocs(Category,val){
       

    }
    
    
    _updateImage = async (state, val)  => {
        debugger
        var bodyFormData = new FormData();
        switch (state) {
            case "vehicle_image":
                    try {
                        bodyFormData.append(`${vehicle_image}`, val.uri); 
                        axios({
                            method: 'post',
                            url: `http://api.ibshr.com/api/account/upload-documents/vehicle_image`,
                            data: bodyFormData,
                            headers: {
                            'Content-Type': 'multipart/form-data' ,
                            Authorization: `Bearer ${token}`}
                            })
                            .then(function (response) {
                                this.setState({ vehicle_image: val })
                            })
                            .catch(function (response) {
                                //handle error
                                console.log(response);
                            });
                      } catch (error) {
                      
                      }
                break;
            case "vCategory":
                this.setState({ vCategory: val },()=>{
                    try {
                        this.UploadDocs('vCategory',val)
                      } catch (error) {
                      
                      }
                })
                break;
            case "driver_license":
                    try {
                        bodyFormData.append(`${driver_license}`, val.uri); 
                        axios({
                            method: 'post',
                            url: `http://api.ibshr.com/api/account/upload-documents/driver_license`,
                            data: bodyFormData,
                            headers: {
                            'Content-Type': 'multipart/form-data' ,
                            Authorization: `Bearer ${token}`}
                            })
                            .then(function (response) {
                                this.setState({ driver_license: val })
                            })
                            .catch(function (response) {
                                //handle error
                                console.log(response);
                            });
                      } catch (error) {
                      
                      }
                break;
            case "personal_id":
                        try {
                            bodyFormData.append(`${personal_id}`, val.uri); 
                            axios({
                                method: 'post',
                                url: `http://api.ibshr.com/api/account/upload-documents/personal_id`,
                                data: bodyFormData,
                                headers: {
                                'Content-Type': 'multipart/form-data' ,
                                Authorization: `Bearer ${token}`}
                                })
                                .then(function (response) {
                                    this.setState({ personal_id: val })
                                })
                                .catch(function (response) {
                                    //handle error
                                    console.log(response);
                                });
                          } catch (error) {
                          
                          }
                break;
            case "vehicle_plate_number":
                        try {
                            bodyFormData.append(`${vehicle_plate_number}`, val.uri); 
                            axios({
                                method: 'post',
                                url: `http://api.ibshr.com/api/account/upload-documents/vehicle_plate_number`,
                                data: bodyFormData,
                                headers: {
                                'Content-Type': 'multipart/form-data' ,
                                Authorization: `Bearer ${token}`}
                                })
                                .then(function (response) {
                                    this.setState({ vehicle_plate_number: val })
                                })
                                .catch(function (response) {
                                    //handle error
                                    console.log(response);
                                });
                          } catch (error) {
                          
                          }
                break;
            case "ncrc":
                        try {
                            bodyFormData.append(`${ncrc}`, val.uri); 
                            axios({
                                method: 'post',
                                url: `http://api.ibshr.com/api/account/upload-documents/ncrc`,
                                data: bodyFormData,
                                headers: {
                                'Content-Type': 'multipart/form-data' ,
                                Authorization: `Bearer ${token}`}
                                })
                                .then(function (response) {
                                    this.setState({ ncrc: val })
                                })
                                .catch(function (response) {
                                    //handle error
                                    console.log(response);
                                });
                          } catch (error) {
                          
                          }
                break;
            default:
        }
    }



    render() {
        return (
            <View style={[styles.imgBackground, { paddingTop: 100, backgroundColor: "#E0E1E3" }]}>
                <View style={styles.wraper}>
                    <Text style={styles.h1}>Required  Papers</Text>
                    <Text style={styles.h2}>Please upload all the below required papers</Text>
                    <Text style={[styles.info, { marginTop: 20, paddingLeft: 0 }]}>* Please make sure to take photos of the required papers before uploading</Text>
                    <Text style={[styles.info, { paddingLeft: 8.5, paddingTop: 10 }]}>* Please click on the below required file button to upload it from the memory</Text>
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    <View style={styles.docsWraper}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this._pickImage("vehicle_image")} style={styles.docButton}>
                                <Text style={styles.text}>Vehicle Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._pickImage("vCategory")} style={styles.docButton}>
                                <Text style={styles.text}>Vehicle Category</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this._pickImage("driver_license")} s style={styles.docButton}>
                                <Text style={[styles.text, { marginTop: 20 }]}>Driver License</Text>
                                <Text style={styles.subText}>(It should not be expired)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._pickImage("personal_id")} style={styles.docButton}>
                                <Text style={styles.text}>Personal ID</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this._pickImage("vehicle_plate_number")} style={styles.docButton}>
                                <Text style={styles.text}>Vehicle Plate Number</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._pickImage("ncrc")} style={styles.docButton}>
                                <Text style={[styles.text, { marginTop: 20, textAlign: 'center' }]}>No criminal record Certificate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.comp}>
                        <View style={styles.image}>
                            {!this.state.vCategory ?
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        style={{ padding: 5, marginTop: 20 }}
                                        name='image'
                                        type='entypo'
                                        color={"#707070"}
                                        size={35}
                                        containerStyle={{ flex: 1 }}
                                    />
                                    <Text style={{ textAlign: 'center', marginBottom: 7, fontSize: 14, color: "#A2A2A2" }}>Vehicle Image</Text>
                                </View>
                                : <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.state.vCategory }} />
                            }
                        </View>
                        <View style={styles.image}>
                            {!this.state.vImage ?
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        style={{ padding: 5, marginTop: 20 }}
                                        name='image'
                                        type='entypo'
                                        color={"#707070"}
                                        size={35}
                                        containerStyle={{ flex: 1 }}
                                    />
                                    <Text style={{ textAlign: 'center', marginBottom: 7, fontSize: 14, color: "#A2A2A2" }}>Vehicle Category</Text>
                                </View> :
                                <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.state.vehicle_image.uri }} />
                            }
                        </View>
                        <View style={styles.image}>
                            {!this.state.vPlateNumber ?
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        style={{ padding: 5, marginTop: 20 }}
                                        name='image'
                                        type='entypo'
                                        color={"#707070"}
                                        size={35}
                                        containerStyle={{ flex: 1 }}
                                    />
                                    <Text style={{ textAlign: 'center', marginBottom: 7, fontSize: 14, color: "#A2A2A2" }}>Vehicle Plate Number </Text>
                                </View> :
                                <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.state.vehicle_plate_number.uri }} />
                            }
                        </View>

                    </View>
                    <View style={[styles.comp, { marginTop: 10 }]}>
                        <View style={styles.image}>
                            {!this.state.driverLicense ?
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        style={{ padding: 5, marginTop: 20 }}
                                        name='image'
                                        type='entypo'
                                        color={"#707070"}
                                        size={35}
                                        containerStyle={{ flex: 1 }}
                                    />
                                    <Text style={{ textAlign: 'center', marginBottom: 7, fontSize: 14, color: "#A2A2A2" }}>Driver License</Text>
                                </View> :
                                <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.state.driver_license.uri }} />
                            }
                        </View>
                        <View style={styles.image}>
                            {!this.state.personalID ?
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        style={{ padding: 5, marginTop: 20 }}
                                        name='image'
                                        type='entypo'
                                        color={"#707070"}
                                        size={35}
                                        containerStyle={{ flex: 1 }}
                                    />
                                    <Text style={{ textAlign: 'center', marginBottom: 7, fontSize: 14, color: "#A2A2A2" }}> Personal ID</Text>
                                </View> :
                                <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.state.personal_id.uri }} />
                            }

                        </View>
                        <View style={styles.image}>
                            {!this.state.noCreminal ?
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        style={{ padding: 5, marginTop: 20 }}
                                        name='image'
                                        type='entypo'
                                        color={"#707070"}
                                        size={35}
                                        containerStyle={{ flex: 1 }}
                                    />
                                    <Text style={{ textAlign: 'center', marginBottom: 7, fontSize: 14, color: "#A2A2A2" }}>Vehicle Image</Text>
                                </View> :
                                <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.state.ncrc.uri }} />
                            }
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: "#0D1C60", textAlign: 'center', fontSize: 24, marginTop: 14, fontWeight: 'bold' }}>No criminal record</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.saveImages()}} style={styles.button}>
                        <Text style={{ color: "white" }}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
};

const styles = {
    image: {
        width: 110,
        height: 80,
        paddingTop: 15,
        marginRight: 10,
        borderWidth: 2,
        borderColor: "#707070"
    },
    comp: {
        marginLeft: 10,
        flex: 3,
        flexDirection: 'row'
    },
    subText: {
        color: "#FFFFFF",
        marginTop: 4,
        fontSize: 8
    },
    text: {
        color: "#FFFFFF",
        marginTop: 25
    },
    docButton: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 70,
        width: 166,
        backgroundColor: "#0D1C60"
    },
    row: {
        flex: 1,
        flexDirection: 'row',

    },
    docsWraper: {
        marginTop: 50,
        height: 300,
        flex: 1,
        flexDirection: 'cloumn'
    },
    info: {
        lineHeight: 14,
        marginLeft: 20,
        marginRight: 20,
        color: "#707070",
        fontSize: 10
    },
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
        marginBottom: 40
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
        paddingLeft: 0,
        paddingRight: 0,
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