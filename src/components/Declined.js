import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import { Icon, PricingCard, Input } from 'react-native-elements';

export default class Declined extends React.Component {

    render() {
        let data = this.props.data.data;
        let name = data.profile ? data.profile.name : "Manaf Hgh";
        return (
            <View >
                <Modal
                    testID={'modal'}
                    isVisible={this.props.Declined}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight">
                    <PricingCard
                        color="#70B32F"
                        title="Alert"
                        price={"Passneger cancled the trip"}
                        info={['Driver Name', 'City: Amman']}
                        onButtonPress={this.props.cancelRequest}
                        button={{ title: 'Ok', }}
                    />
                </Modal>
            </View>
        );
    }
}

//style for this component
const styles = StyleSheet.create({
});
