import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../common/theme';
import { Rating, AirbnbRating } from 'react-native-elements';

export default class RateModal extends React.Component {

    render() {
        let phone = "0780000000"
        return (
            <View style={styles.scrollableModal}>

                <View style={styles.scrollableModalContent1}>
                    <View style={styles.contentWraper}>
                        <View style={styles.headerTextStyle}>
                            <Text style={styles.ProfileNameStyle}> Rate Your Trip</Text>
                            <AirbnbRating
                                onFinishRating={this.props._rate}
                                count={5}
                                defaultRating={0}
                                size={20}
                            />
                        </View>
                    </View>
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
        left: 40,
        width: 70,
        flex: 1,
        flexDirection: 'row'
    },
    headerTextStyle: {
        position: 'absolute',
        top: 30,
        left: 100,
        width: 180,
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    scrollableModal: {
        height: 180,
    },
    scrollableModalContent1: {
        paddingBottom: 20,
        height: 180,
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
        left: 120,
        width: 80,
        flex: 1,
        flexDirection: 'row'
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
