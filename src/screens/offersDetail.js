import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import CollapsibleList from "react-native-collapsible-list";
import { Icon, Input, Button } from 'react-native-elements';
import Clint from '../API/Client';
import MapComponent from '../components/MapComponent'


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
    render() {
        return (
            <View style={styles.container}>
                <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                        <View style={styles.button}>
                            <Icon
                                style={{ padding: 0 }}
                                name='timetable'
                                type='material-community'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginTop: 10 }}
                            />
                            <Text style={styles.buttonText}>Date & Time</Text>
                            <Icon
                                name='caret-down'
                                type='font-awesome'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginLeft: 100 }}
                            />
                        </View>
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
                        <View style={styles.button}>
                            <Icon
                                style={{ padding: 0 }}
                                name='map-marker'
                                type='font-awesome'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginTop: 10 }}
                            />
                            <Text style={styles.buttonText}>Location</Text>
                            <Icon
                                name='caret-down'
                                type='font-awesome'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginLeft: 140 }}
                            />
                        </View>
                    }
                >
                    <View style={{ height: 30 }}>
                        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 10 }}>From : Lwaibdeh</Text>
                        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 10 }}>To: Al Rabieh</Text>
                    </View>
                    <View style={styles.collapsibleItem1}>
                        <MapComponent mapRegion={this.region} mapStyle={styles.map} />
                    </View>
                </CollapsibleList>
                <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                        <View style={styles.button}>
                            <Icon
                                style={{ padding: 0 }}
                                name='home'
                                type='font-awesome'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginTop: 10 }}
                            />
                            <Text style={styles.buttonText}>House Info</Text>
                            <Icon
                                name='caret-down'
                                type='font-awesome'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginLeft: 140 }}
                            />
                        </View>
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
                        <View style={styles.button}>
                            <Icon
                                style={{ padding: 0 }}
                                name='credit-card'
                                type='font-awesome'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginTop: 10 }}
                            />
                            <Text style={styles.buttonText}>Payment Info</Text>
                            <Icon
                                name='caret-down'
                                type='font-awesome'
                                color={"#000"}
                                size={35}
                                containerStyle={{ flex: 1, marginLeft: 140 }}
                            />
                        </View>
                    }
                >
                    <View style={styles.collapsibleItemC}>
                        <Text></Text>
                    </View>
                    <View style={styles.collapsibleItemC}>
                        <Text style={{fontSize:20, textAlign:'center'}}>Cash</Text>
                    </View>
                </CollapsibleList>
                <Input
                    containerStyle={{ padding: 4 }}
                    inputContainerStyle={{ marginTop: 0, padding: 5, marginRight: 20, paddingRight: 60 }}
                    placeholder='Place your Offer'
                    leftIcon={
                        <Icon
                            name='dollar'
                            type='font-awesome'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Button
                style={{marginRight:20, marginLeft:20, marginTop:10}}
                    
                    // icon={
                    //     // <Icon
                    //     //     name='check'
                    //     //     type='font-awesome'
                    //     //     size={15}
                    //     //     color="white"
                    //     // />
                    // }
                    title="Set your offer"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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