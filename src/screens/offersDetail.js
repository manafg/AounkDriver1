import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import CollapsibleList from "react-native-collapsible-list";
import { Icon, Input, Button, ListItem } from 'react-native-elements';
import Clint from '../API/Client';
import MapComponent from '../components/MapComponent';
import {TextInput} from 'react-native'


export default class OffersDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.region = {
            latitude: 31.963158,
            longitude: 35.930359,
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
        }
        this.submitOffer=this.submitOffer.bind(this)
    }

    componentDidMount() {
        this.getItemDetail();
    }

    getItemDetail() {
        const { requestId } = this.props.navigation.state.params;
        Clint.get(`requests/move-furniture/${requestId}`).then((res) => {
            debugger
            this.setState({ data: res.data })
        }).catch((res) => {
        })
    }

    submitOffer() {
        const { requestId } = this.props.navigation.state.params;
        let obj = {
            price:"100"
        }
        Clint.post(`requests/move-furniture/${requestId}/offers`,obj).then((res)=>{
            this.props.navigation.goBack()
        }).catch((res)=>{
            debugger
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                        <ListItem
                            style={{ borderBottomWidth: .5, borderColor: '#B0B0B0' }}
                            leftIcon={<Icon
                                style={{ padding: 0 , flex:1}}
                                name='map-marker'
                                type='font-awesome'
                                color={"#70B32F"}
                                size={35}
                            />}
                            rightIcon={<Icon
                                style={{ padding: 0 }}
                                name='ios-arrow-down'
                                type='ionicon'
                                color={"#909090"}
                                size={35}
                            />}
                            titleStyle={{  color:'#0D1C60',fontSize: 20, fontWeight:'bold' }}
                            title={'Detail'}
                            subtitle={'Date and Time of the drop off'}
                        />
                    }
                >
                    <View style={styles.collapsibleItem}>
                        <Text></Text>
                    </View>
                    <View style={styles.collapsibleItem}>
                        <Text>Created at : 09/10/2020</Text>
                    </View>
                    <View style={styles.collapsibleItem}>
                        <Text>End in : 3 Days</Text>
                    </View>
                    <View style={styles.collapsibleItem}>
                        <Text>Be there At : Date: 12/10/2020 Time: 2:00 PM</Text>
                    </View>
                </CollapsibleList>
                <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                        <ListItem
                            style={{ borderBottomWidth: .5, borderColor: '#B0B0B0' }}
                            leftIcon={<Icon
                                style={{ padding: 0, flex:1 }}
                                name='list-alt'
                                type='font-awesome'
                                color={"#70B32F"}
                                size={30}
                            />}
                            rightIcon={<Icon
                                style={{ padding: 0 }}
                                name='ios-arrow-down'
                                type='ionicon'
                                color={"#909090"}
                                size={35}
                            />}
                            titleStyle={{  color:'#0D1C60',fontSize: 20, fontWeight:'bold' }}
                            title={'Location'}
                            subtitle={'Location of the drop off'}
                        />
                    }
                >
                    <View style={{ height: 30 }}>
                        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 10 }}>From : Lwaibdeh</Text>
                        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 10 }}>To: Al Rabieh</Text>
                    </View>
                    <View style={styles.collapsibleItem1}>
                        <MapComponent mapRegion={this.region} markerCord={{ lat: this.region.latitude, long: this.region.longitude }} mapStyle={styles.map} />
                    </View>
                </CollapsibleList>
                <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                        <ListItem
                            style={{ borderBottomWidth: .5, borderColor: '#B0B0B0' }}
                            leftIcon={<Icon
                                style={{ padding: 0 }}
                                name='home'
                                type='font-awesome'
                                color={"#70B32F"}
                                size={35}
                            />}
                            rightIcon={<Icon
                                style={{ padding: 0 }}
                                name='ios-arrow-down'
                                type='ionicon'
                                color={"#909090"}
                                size={35}
                            />}
                            titleStyle={{  color:'#0D1C60',fontSize: 20, fontWeight:'bold' }}
                            title={'Services'}
                            subtitle={'Services That you Requested'}
                        />
                    }
                >
                    <View style={styles.collapsibleItem}>
                        <Text></Text>
                    </View>
                    <View style={styles.collapsibleItem}>
                        <Text>Wraping Clothes</Text>
                    </View>
                    <View style={styles.collapsibleItem}>
                        <Text>Unpack furniture</Text>
                    </View>
                    <View style={styles.collapsibleItem}>
                        <Text>House Cleaning</Text>
                    </View>
                    <View style={styles.collapsibleItem}>
                        <Text>House Space 120M</Text>
                    </View>
                </CollapsibleList>
                <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                        <ListItem
                            style={{ borderBottomWidth: .5, borderColor: '#B0B0B0' }}
                            leftIcon={<Icon
                                style={{ padding: 0 }}
                                name='credit-card-alt'
                                type='font-awesome'
                                color={"#70B32F"}
                                size={30}
                            />}
                            rightIcon={<Icon
                                style={{ padding: 0 }}
                                name='ios-arrow-down'
                                type='ionicon'
                                color={"#909090"}
                                size={35}
                            />}
                            titleStyle={{  color:'#0D1C60',fontSize: 20, fontWeight:'bold' }}
                            title={'Payment'}
                            subtitle={'Payment method'}
                        />
                    }
                >
                    <View style={styles.collapsibleItemC}>
                        <Text></Text>
                    </View>
                    <View style={styles.collapsibleItemC}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Cash</Text>
                    </View>
                </CollapsibleList>
                <Input
                    inputStyle={{fontSize:20, fontWeight:'bold', color: "#70B32F"}}
                    containerStyle={{ padding: 4 }}
                    inputContainerStyle={{ marginTop: 0, padding: 5, marginHorizontal:20}}
                    placeholder='Place your Offer'
                />

                <TextInput 
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={3}
                    placeholder="Any Notes ?"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.props.text} />
                <Button
                style={{marginRight:20, marginLeft:20, marginTop:10}}
                    onPress={this.submitOffer}
                    // icon={
                    //     // <Icon
                    //     //     name='check'
                    //     //     type='font-awesome'
                    //     //     size={15}
                    //     //     color="white"
                    //     // />
                    // }
                    title="Submit"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        marginHorizontal:20,
        borderColor: 'grey',
        borderWidth: 1,
        marginTop:20,
        borderRadius:10,
        padding: 10,
        height: 100,
        justifyContent: "flex-start"
      },
    map: {
        borderRadius: 10,
        height: 350,
        marginTop: 90,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        marginTop: 20,
        height: 50,
        backgroundColor: '#DCDCDC',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#696969'
    },
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "white"
    },
    wrapperCollapsibleList: {
        marginTop: 0,
        overflow: "hidden",
        backgroundColor: "#FFF",
        borderRadius: 5
    },
    collapsibleItem: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#CCC",
        padding: 10
    },
    collapsibleItemC: {
        height: 40,
        padding: 10
    },
    collapsibleIte1: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#CCC",
        padding: 0
    }
});