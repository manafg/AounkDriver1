import React from 'react';
import { Notifications } from '../components';

import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import SwitchSelector from "react-native-switch-selector";

import { Header, Icon } from 'react-native-elements';
import { colors } from '../common/theme';

export default class NotificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineStatus: 'off'
        }
    }

    setOnline(val) {

        if (val == "on") {
            Client.patch(`account/activity-status/ONLINE`, {}).then((res) => {
                this.setState({ lineStatus: val })
            }).catch((res) => {
            })
        } else {
            Client.patch(`account/activity-status/OFFLINE`, {}).then((res) => {
                this.setState({ lineStatus: val })
            })
        }

    }
    
    render() {
        return (
            <View style={styles.mainView}>
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
                <View style={{ flex: 1, height: 150 }}>
                    <View style={styles.profileWraper}>
                        <Text style={{ color: "#FFF", marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Manaf HGH</Text>
                        <View style={styles.rating}>

                            <Text style={styles.ratingText}>4.8</Text>
                            <Icon
                                name='star'
                                type='material-community'
                                color={"#FFF"}
                                size={23}

                            />
                        </View>
                        <View style={styles.userImageView}>
                            <Image
                                source={require('../../assets/images/profilePic.png')}
                                style={styles.imageStyle}
                            />

                        </View>

                    </View>
                    <View style={styles.earned}>
                        <Text style={styles.earnedText}>Earned Today</Text>
                        <Text style={styles.Total}>215.90 JOD</Text>
                    </View>
                    <View style={styles.seprator}></View>
                    <View style={styles.detailesWraper}>
                        <View style={styles.cluomn}>
                            <Text style={styles.headerVal}>Total Trips</Text>
                            <Text style={styles.val}>15</Text>
                        </View>
                        <View style={styles.cluomn}>
                            <Text style={styles.headerVal}>Total Trips</Text>
                            <Text style={styles.val}>1 <Text style={styles.mesure}>h</Text> 30 <Text style={styles.mesure}>m</Text> </Text>
                        </View>
                        <View style={styles.cluomn}>
                            <Text style={styles.headerVal}>Total Trips</Text>
                            <Text style={styles.val}>45 <Text style={styles.mesure}>km</Text></Text>
                        </View>

                    </View>
                    <Text style={{marginLeft:10, color:"#808080"}}>Notifications</Text>
                </View>
                <Notifications></Notifications>
            </View>
        );
    }
}

//Screen Styling
const styles = StyleSheet.create({
    val:{
        color:"#0D1C60"
    },
    mesure:{
        fontSize:12,
        color:"#808080"
    },
    headerVal:{
        fontSize:14,
        color:"#808080"
    },
    cluomn:{
        flex:1,
        flexDirection:'column',
    },
    detailesWraper:{
        marginTop:10,
        marginLeft:30,
        flex:1,
        flexDirection:'row'
    },
    seprator:{
        borderColor:"#CCCCCC", borderWidth:0.8, marginTop:130
    },
    Total:{
        marginTop:5,
        fontSize:24,
        fontWeight:'bold',
        color:"#0D1C60"
    },
    earned: {
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: 210,
        left: 125,
       
    },
    earnedText:{
        fontSize: 16,
        color: '#808080'
    },
    ratingText: {
        color: "#FFF",
        fontSize: 16,
        marginRight: 5
    },
    rating: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row'
    },
    userImageView: {
        width: 105,
        height: 105,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        left: 140,
        position: 'absolute',
        top: 90,
        borderColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    imageStyle: {
        width: 100,
        height: 100
    },
    profileWraper: {
        height: 150,
        alignItems: 'center',
        backgroundColor: "#0D1C60"
    },
    headerStyle: {
        backgroundColor: colors.GREY.default,
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'Roboto-Bold',
        fontSize: 20
    },
    containerView: {
        flex: 1
    },
    textContainer: {
        textAlign: "center"
    },
    mainView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        marginTop: StatusBar.currentHeight
    }
});
