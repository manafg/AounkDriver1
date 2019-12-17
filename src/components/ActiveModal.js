import React from 'react';
import { 
    StyleSheet, 
    Image,
    Text,
    View,
    TouchableOpacity,
    Linking
  } from 'react-native';
  import {  Icon } from 'react-native-elements';
  import { colors } from '../common/theme';


  


export default class ActiveModal extends React.Component {
    
  render() {
      let phone = "0780000000"
    return (
        <View style={styles.scrollableModal}>

        <View style={styles.scrollableModalContent1}>
            <View style={styles.contentWraper}>
                <View style={styles.userImageView}>
                    <Image
                        source={require('../../assets/images/profilePic.png')}
                        style={styles.imageStyle}
                    />

                </View>
                <View style={styles.headerTextStyle}>
                    <Text style={styles.ProfileNameStyle}>{this.props.name}</Text>
                </View>
                <View style={styles.rating}>
                    <Icon
                        style={{ padding: 10 }}
                        name='star'
                        type='material-community'
                        color={"#FBAE17"}
                        size={23}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>4.8</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.props.openLoc()}} style={[styles.subTextSec,{top:60, left:240, flexDirection:'column'}]}>
                    <Icon
                        style={{ padding: 0 }}
                        name='md-map'
                        type='ionicon'
                        color={"#72BE44"}
                        size={35}
                        containerStyle={{ flex: 0 }}
                    />
                    <Text style={[styles.ratingText,{fontSize:12, paddingLeft:15}]}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${phone}`)}} style={styles.subTextSec}>
                    <Icon
                        style={{ padding: 5 }}
                        name='ios-call'
                        type='ionicon'
                        color={"#72BE44"}
                        size={30}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.showMessage()}} style={[styles.subTextSec,{left:140}]}>
                    <Icon
                        style={{ padding: 5 }}
                        name='ios-chatboxes'
                        type='ionicon'
                        color={"#72BE44"}
                        size={30}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${phone}`)}} style={[styles.subTextSec,{left:250}]}>
                    <Icon
                        style={{ padding: 5 }}
                        name='md-close'
                        type='ionicon'
                        color={"#72BE44"}
                        size={30}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {  this.props.onStart() }}
            >
                <Text style={{ color: 'white', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Active</Text>
            </TouchableOpacity>

        </View>

    </View>
    );
  }
}

//style for this component
const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: '80%',
        padding: 10,
        height: 60,
        marginTop: 190,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
    rating: {
        position: 'absolute',
        top: 60,
        left: 140,
        width: 70,
        flex: 1,
        flexDirection: 'row'
    },
    headerTextStyle: {
        position: 'absolute',
        top: 30,
        left: 140,
        width: 180,
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    scrollableModal: {
        height: 300,
    },
    scrollableModalContent1: {
        paddingBottom: 50,
        height: 300,
        backgroundColor: 'rgba(200, 200, 200,  0.7)',
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
    ProfileNameStyle: {
        fontWeight: 'bold',
        color: "#0D1C60",
        fontSize: 18,
        textAlign: "left"
    },
    subTextSec: {
        position: 'absolute',
        top: 130,
        left: 50,
        width: 80,
        flex: 1,
        flexDirection:'row'
    },
    subText: {
        width: 140,
        color: "#666666"
    },
    ratingText: {
        color: "#808080",
        fontSize: 20,
    },
});
