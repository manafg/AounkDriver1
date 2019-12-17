import React from 'react';
import { 
    StyleSheet, 
    Image,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import {  Icon } from 'react-native-elements';
  import { colors } from '../common/theme';

  


export default class AcceptModal extends React.Component {
  render() {
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
                <View style={styles.subTextSec}>
                    <Text style={styles.subText}>You will arive in 10 Min</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {  this.props.onPressAccept() }}
            >
                <Text style={{ color: 'white', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}> Accept Trip</Text>
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
        marginTop: 150,
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
        height: 250,
    },
    scrollableModalContent1: {
        paddingBottom: 50,
        height: 250,
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
        textAlign: "center"
    },
    subTextSec: {
        position: 'absolute',
        top: 90,
        width: 150,
        left: 150,
        width: 160,
        flex: 1,
    },
    subText: {
        width: 140,
        color: "#666666"
    },
    ratingText: {
        color: "#808080",
        fontSize: 24
    },
});
