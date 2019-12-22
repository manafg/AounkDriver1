import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Switch, Alert, Dimensions, FlatList, TouchableHighlight, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Button, Header, Icon, PricingCard, Input } from 'react-native-elements';
import Polyline from '@mapbox/polyline';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { colors } from '../common/theme';
import { Constants } from 'expo';
import { Permissions } from 'expo-permissions'
import io from 'socket.io-client';
import { withNavigation, DrawerActions } from 'react-navigation'
import { AsyncStorage } from 'react-native';
import Client from '../API/Client';
import SwitchSelector from "react-native-switch-selector";
import Modal from "react-native-modal";
import SideMenuHeader from '../components/SideMenuHeader';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';
import AnimatedLoader from "react-native-animated-loader";
import AcceptModal from '../components/AcceptModal';
import ActiveModal from '../components/ActiveModal';
import FinishModal from '../components/FinishModal';
import RateModal from '../components/RateModal';
import Declined from '../components/Declined'
import getDirections from 'react-native-google-maps-directions'



const SOCKET_URL = 'http://apis.aounak.com';
let conected = false;

var { width, height } = Dimensions.get('window');
var google;
import { GeoFire } from 'geofire';

var { height } = Dimensions.get('window');


export default class DriverTripAccept extends React.Component {

    constructor(props) {
        super(props);
        this.socket = io(SOCKET_URL, {
            path: '/socket.io'
        });
        this.state = {
            recivedNewReq: null,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
            newReq: false,
            messageShow:false,
            fareScreen: false,
            startTrip: false,
            Declined:false,
            completeTrip: false,
            online: null,
            receipt:null,
            starCount: 5,
            modalVisible: false,
            fareScreen: false,
            loaderVisible: false,
            alertModalVisible: false,
            rateModal:false,
            coords: [],
            views: false,
            radio_props: [
                { label: 'Unable to Contact Driver', value: 0 },
                { label: 'Cab is not moving in my direction', value: 1 },
                { label: 'My reason is not listed', value: 2 },
                { label: 'Driver Denied duty', value: 3 },
                { label: 'Cab is not coming on expected time', value: 4 }
            ],
            value: 0,
            tasklist: [],
            myLocation: {},
            driverDetails: null,
            curUid: '',
            userID: null
        }

        this._getLocationAsync();
        this.onPressAccept = this.onPressAccept.bind(this)
        this.onStart = this.onStart.bind(this);
        this.onComp = this.onComp.bind(this);
        this._rate = this._rate.bind(this);
        this.handleGetDirections= this.handleGetDirections.bind(this);
        this._showMessage = this._showMessage.bind(this);
        this._hideMessage = this._hideMessage.bind(this);
    }

    onConnectSocket = () => {
        if (!conected) {
            let id = AsyncStorage.getItem('userID').then((value) => {
                if (value !== null) {
                    this.setState({ userID: value }, () => {
                        if (this.socket) {
                            this.socket.emit('join', this.state.userID)
                            conected = true
                        }
                    })
                }
            });
        }
    }

    _rejectTrip(){
        Client.patch(`requests/truck/${this.state.recivedNewReq.data.requestId}/reject`).then((res)=>{
            this.cancelRequest()
        })
    }

   

   

    _hideMessage(){
        this.setState({messageShow:false})
    }

    _showMessage(){
        this.setState({messageShow:true})
    }
    
    _writeMessage(val){
        this.setState({message:val})
    }

    handleGetDirections = (source, destination) => {
        const data = {
           source: {
            latitude: this.state.recivedNewReq.data.passenger_location.lat,
            longitude: this.state.recivedNewReq.data.passenger_location.lng
          },
          destination: {
            latitude: this.state.recivedNewReq.data.passenger_destination.lat,
            longitude: this.state.recivedNewReq.data.passenger_destination.lng 
          },
          params: [
            {
              key: "travelmode",
              value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
            {
              key: "dir_action",
              value: "navigate"       // this instantly initializes navigation using the given travel mode
            }
          ]
        }
     
        getDirections(data)
    }

    
    listen() {
        this.socket.on('show_notification', (val) => {

                if (val.data.driver_location) {
                    val.data.my_location = val.data.driver_location;
                }
                let isDecline = val.data.request_status == "DECLINED" ? true:false;
                this.setState({ recivedNewReq: !isDecline ? val :null, modalVisible: !isDecline , Declined:isDecline, newReq: true, completeTrip: false, startTrip: false,rateModal:false, fareScreen: false })
                this.getDirections()
        });
    }
    componentWillUnmount() {
        Client.patch(`account/activity-status/OFFLINE`, {}).then((res) => {
            this.setState({ online: "off" })
        })
    }

    componentDidMount() {
        Client.patch(`account/activity-status/OFFLINE`, {}).then((res) => {
            this.setState({ online: "off" })
        }).catch((res) => {
        })
        this.checkStatus()
        this.getRiders();
        this.onConnectSocket();
        this.listen();

    }

    checkStatus() {
        Client.get(`account/activity-status`, {}).then((res) => {
            res.data.my_location = res.data.driver_location
            res.data.my_location.lng = res.data.driver_location.lng
            if (res.data.request_status == "DECLINED") { }
            if (res.data.request_status == "ACTIVE") {
                this.setState({ recivedNewReq: res, modalVisible: true, newReq: false, completeTrip: false, startTrip: true, rateModal:false,fareScreen: false })
            }
            if (res.data.request_status == "STARTED") {
                this.setState({ recivedNewReq: res, modalVisible: true, newReq: false, completeTrip: true, startTrip: false,rateModal:false, fareScreen: false })
            }
            if (res.data.request_status == "COMPLETED") {
                debugger
                this.setState({ recivedNewReq: res, modalVisible: true, newReq: false, completeTrip: false, startTrip: false,rateModal:false, fareScreen: true })
            }
        }).catch((res) => {

        })

    }

    setOnline(val) {

        if (val == "on") {
            Client.patch(`account/activity-status/ONLINE`, {}).then((res) => {
                this.setState({ online: val })
            }).catch((res) => {
            })
        } else {
            Client.patch(`account/activity-status/OFFLINE`, {}).then((res) => {
                this.setState({ online: val })
            })
        }

    }
    cancelRequest() {
        this.setState({ recivedNewReq: null, modalVisible: false, newReq: false, completeTrip: false, startTrip: false, rateModal:false,fareScreen: false })
    }

    onStart() {
        Client.patch(`requests/truck/${this.state.recivedNewReq.data.requestId}/start`).then((res) => {
            this.setState({ startTrip: false, completeTrip: true, newReq: false, fareScreen: false });
            setTimeout(() => {
                this.setState({ modalVisible: true })
            }, 1000)
        }).catch((res) => {
        })
    }
    _rate(){
        this.setState({modalVisible:false, fareScreen:true})
    }
    onComp() {
        Client.patch(`requests/truck/${this.state.recivedNewReq.data.requestId}/complete`).then((res) => {
            this.setState({ startTrip: false, completeTrip: false, rateModal: true, newReq: false, modalVisible: false, receipt: res.data.receipt })
            setTimeout(() => {
                this.setState({ modalVisible: true })
            }, 1000)
        }).catch((res) => {
        })
    }

    showAlert(title, val) {
        Alert.alert(
            `${title}`,
            `${val}`,
            [
                {
                    text: 'OK',
                    onPress: {},
                }
            ],
            { cancelable: true },
        )
    }

    // find your origin and destination point coordinates and pass it to our method.
    async getDirections() {
        try {
            axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.recivedNewReq.data.my_location}&destination=${this.state.recivedNewReq.data.passenger_destination}&key=AIzaSyD8rFXA6KM_9OCzNcErc4d9Vsr1KeTPIxk`).then((res) => {

                let points = Polyline.decode(res.data.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                })
                this.setState({ coords: coords, views: true })
            })
            // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.recivedNewReq.data.my_location}&destination=${this.state.recivedNewReq.data.passenger_destination}&key=AIzaSyD8rFXA6KM_9OCzNcErc4d9Vsr1KeTPIxk`)
            // let respJson = await resp.json();
            // let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            // let coords = points.map((point, index) => {
            //     return {
            //         latitude: point[0],
            //         longitude: point[1]
            //     }
            // })
            // await this.setState({ coords: coords, views: true })
            // return coords
        }
        catch (error) {
            alert(error)
            return error
        }
    }

    //get current location
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        Location.watchPositionAsync({}, (location) => {
            if (location) {
                var pos = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };
                this.setState({ myLocation: pos })
                if (pos) {
                    var latlng = pos.latitude + ',' + pos.longitude;
                    return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyDZ7HSZZafEkBmuwD2CdHrLJNn3kEm39Fo')
                        .then((response) => response.json())
                        .then((responseJson) => {

                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }

        });
    }

    //get nearby riders function
    getRiders() {


    }

    //get booking details function
    getBookingDetails() {

    }

    // accept button press function
    onPressAccept() {
        let obj = {
            "my_location": this.state.recivedNewReq.data.my_location,
            "passenger_location": this.state.recivedNewReq.data.passenger_location,
            "passenger_destination": this.state.recivedNewReq.data.passenger_destination
        }
        this.setState({ loaderVisible: true })
        Client.patch(`/requests/truck/${this.state.recivedNewReq.data.requestId}/accept`, obj).then((res) => {
            this.setState({ modalVisible: false, loaderVisible: false, startTrip: true,rateModal:false, completeTrip: false, newReq: false })
            setTimeout(() => {
                this.setState({ modalVisible: true })
            }, 1000)
        }).catch((res) => {
        })
    }

    onPressIgnore(item) {


    }


    render() {
        let status= this.state.online == "on"? "Online" : "Offline";
        let color = this.state.online == "on"? '#72BE44' : "#949494";
        let name = this.state.recivedNewReq ? this.state.recivedNewReq.data.profile.name : "Manaf Hgh";
        let currentLat = this.state.recivedNewReq ? this.state.recivedNewReq.data.passenger_location.lat : 31.9265336;
        let currentLng = this.state.recivedNewReq ? this.state.recivedNewReq.data.passenger_location.lng : 35.9589416;
        let destLat = this.state.recivedNewReq ? this.state.recivedNewReq.data.passenger_destination.lat : 31.9265336;
        let destLng = this.state.recivedNewReq ? this.state.recivedNewReq.data.passenger_destination.lng : 35.9589416;
        return (
            <View style={styles.mainViewStyle}>
                <AnimatedLoader
                    visible={this.state.loaderVisible}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../../assets/loader.json")}
                    animationStyle={{ width: 100, height: 100 }}
                    speed={1}
                />
                <Header
                    backgroundColor={"#E0E1E3"}
                    leftComponent={{ icon: 'md-menu', type: 'ionicon', color: "#0D1C60", size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) } }}
                    centerComponent={
                        <SwitchSelector
                            initial={0}
                            onPress={value => this.setOnline(value)}
                            textColor={"#707070"} //'#7a44cf'
                            selectedColor={"#FFFFFF"}
                            buttonColor={"#72BE44"}
                            borderColor={"#72BE44"}
                            hasPadding
                            options={[
                                { label: "Offline", value: "off", },
                                { label: "Online", value: "on", }//images.feminino = require('./path_to/assets/img/feminino.png')
                                //images.masculino = require('./path_to/assets/img/masculino.png')
                            ]}
                        />
                    }
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={styles.headerInnerStyle}
                />
                
                <View style={{ width: '100%', textAlign: 'center', justifyContent: 'center', backgroundColor: color, height: 25 }}>
                    <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>You are {status} </Text>
                </View>

                <View style={styles.mapcontainer}>
                    <MapView style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: this.state.recivedNewReq ? parseInt(this.state.recivedNewReq.data.my_location.lat) : 31.9265336,
                            longitude: this.state.recivedNewReq ? parseInt(this.state.recivedNewReq.data.my_location.lng) : 35.9589416,
                            latitudeDelta: 0.5022,
                            longitudeDelta: 0.1821
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: currentLat, longitude: currentLng }}
                            image={require('../../assets/images/Dest.png')}
                        />

                        <Marker
                            coordinate={{ latitude: destLat, longitude: destLng }}
                            description={'5 min | Amman Jordan'}
                            pinColor={colors.GREEN.default}
                            image={require('../../assets/images/cuurentLoc.png')}
                        />

                        <MapViewDirections
                            origin={{ latitude: currentLat, longitude: currentLng }}
                            destination={{ latitude: destLat, longitude: destLng }}
                            apikey={'AIzaSyDZ7HSZZafEkBmuwD2CdHrLJNn3kEm39Fo'}
                        />

                    </MapView>
                </View>
                <Modal
                    testID={'modal'}
                    isVisible={this.state.fareScreen}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight">
                    <PricingCard
                        color="#70B32F"
                        onButtonPress={()=>{this.cancelRequest()}}
                        title="Total"
                        price={this.state.receipt? this.state.receipt.total : null}
                        info={[name, `Time : ${this.state.receipt ? this.state.receipt.trip_fare_time : null}`, 'City: Amman']}
                        button={{ title: 'Finish', }}
                    />
                </Modal>
                {this.state.Declined && 
                    <Declined Declined = {this.state.Declined} cancelRequest={this.cancelRequest.bind(this)} />
                }
                <Modal
                    testID={'modal'}
                    isVisible={this.state.messageShow}
                    backdropColor="#B4B3DB"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}>
                    <View style={styles.messageContent}>
                        <Text style={styles.messageContentTitle}>Type your message</Text>
                        <View style={{borderWidth:1, borderRadius:5, width:'100%'}}>
                        <Input
                            onChange={this._writeMessage}
                            placeholder='Write your message here'
                        />
                        </View>
                        <Button onPress={this._hideMessage}  title="Send" />
                        <Button onPress={this._hideMessage}  title="Close" />
                    </View>
                </Modal>
                <Modal
                    hasBackdrop={false}
                    isVisible={this.state.modalVisible}
                    coverScreen={false}
                    onSwipeComplete={() => this.setState({ modalVisible: false })}
                    swipeDirection="down"
                    scrollTo={this.handleScrollTo}
                    scrollOffset={this.state.scrollOffset}
                    scrollOffsetMax={400 - 300} // content height - ScrollView height
                    style={styles.bottomModal}>
                    {this.state.newReq &&
                        <AcceptModal reject={this._rejectTrip.bind(this)} name={name} onPressAccept={this.onPressAccept} />
                    }
                    {this.state.startTrip &&
                        <ActiveModal name={name} showMessage={this._showMessage} openLoc={this.handleGetDirections} onStart={this.onStart} />
                    }
                    {this.state.completeTrip &&
                        <FinishModal name={name} openLoc={this.handleGetDirections} onComp={this.onComp} />
                    }
                    { this.state.rateModal &&
                        <RateModal _rate={this._rate} />
                    }
                </Modal>
            </View>

        )
    }
}

//Screen Styling
const styles = StyleSheet.create({
    myHeader: {
        marginTop: 0,
    },


    scrollableModalText1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        padding: 20,
        marginLeft: 20,
        fontSize: 20,
        color: '#4D4D4D',
    },


    scrollableModal: {
        height: 250,
    },
    scrollableModalContent1: {
        paddingBottom: 50,
        height: 250,
        backgroundColor: 'rgba(200, 200, 200,  0.7)',
    },
    headerStyle: {
        backgroundColor: colors.GREY.default,
        borderBottomWidth: 0
    },
    headerInnerStyle: {
        marginLeft: 10,
        marginRight: 10
    },
    headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'Roboto-Bold',
        fontSize: 20
    },
    mapcontainer: {
        flex: 6,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapDetails: {
        backgroundColor: colors.WHITE,
        flex: 1,
        flexDirection: 'column',
    },
    contentWraper: {
        position: 'absolute',
    },
    userImageView: {
        width: 84,
        height: 84,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        left: 40,
        top: 20,
        borderColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: colors.TRANSPARENT,
        borderStyle: 'solid',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 10,
        borderLeftColor: colors.TRANSPARENT,
        borderRightColor: colors.TRANSPARENT,
        borderBottomColor: colors.YELLOW.secondary,
        transform: [
            { rotate: '180deg' }
        ]
    },
    signInTextStyle: {
        fontFamily: 'Roboto-Bold',
        fontWeight: "700",
        color: colors.WHITE
    },
    listItemView: {
        flex: 1,
        width: '100%',
        // height: 350,
        marginBottom: 10,
        flexDirection: 'column',
    },
    dateView: {
        flex: 1.1
    },
    listDate: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: colors.GREY.default,
        flex: 1
    },
    addressViewStyle: {
        flex: 2,
        paddingLeft: 10
    },
    addressViewTextStyle: {
        color: colors.GREY.secondary,
        fontSize: 15,
        marginLeft: 15,
        lineHeight: 24
        , flexWrap: "wrap",
    },
    greenDot: {
        backgroundColor: colors.GREEN.default,
        width: 10,
        height: 10,
        borderRadius: 50
    },
    redDot: {
        backgroundColor: colors.RED,
        width: 10,
        height: 10,
        borderRadius: 50
    },
    detailsBtnView: {
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: width,
        marginTop: 10,
        marginBottom: 10
    },

    modalPage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalMain: {
        flex: 1,
        backgroundColor: colors.GREY.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        flex: 1,
        maxHeight: 180
    },
    modalHeading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBody: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopColor: colors.GREY.iconPrimary,
        borderTopWidth: 1,
        width: '100%',
    },
    btnStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainViewStyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    fixAdressStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        borderRadius: 10,
        width: '80%',
        padding: 10,
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
    myButtonStyle: {
        backgroundColor: colors.RED,
        width: height / 6,
        padding: 2,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        borderRadius: 5,
    },

    alertStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        width: '100%',
        textAlign: 'center'
    },
    cancelTextStyle: {
        color: colors.BLUE.secondary,
        fontSize: 18,
        fontWeight: 'bold',
        width: "100%",
        textAlign: 'center'
    },
    okStyle: {
        color: colors.BLUE.secondary,
        fontSize: 18,
        fontWeight: 'bold'
    },
    viewFlex1: {
        flex: 1
    },
    clickText: {
        borderRightColor: colors.GREY.iconPrimary,
        borderRightWidth: 1
    },
    titleStyles: {
        width: "100%",
        alignSelf: 'center'
    }
});