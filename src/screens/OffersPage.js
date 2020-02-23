import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Text,
    FlatList,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import Client from '../API/Client'
import { DrawerActions } from 'react-navigation'
import { Header, PricingCard } from 'react-native-elements';
import { Container, Tab, Tabs, TabHeading, Icon } from 'native-base';

export default class OffersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [{ a: 1 }]
        }
      
    }

    componentDidMount() {
        Client.get(`requests/move-furniture`).then((res) => {
            this.setState({
                offers: res.data
            })
        }).catch((ere) => {
        })
    }

    newData = ({ item }) => {
        let Cleaning = item.cleaning ? 'Cleaning ' : '';
        let unpackFurniture = item.unpackFurniture ? 'Unpack Furniture ' : '';
        let wrappingClothes = item.wrappingClothes ? 'Wrapping Clothes ' : '';
        let services = Cleaning + unpackFurniture + wrappingClothes;
        return (
            <View style={styles.innerContainer}>
                <PricingCard
                    color="#72BE44"
                    onButtonPress={() => {
                        this.props.navigation.navigate('OffersDetail', {
                            requestId: item._id,
                        })
                    }}
                    title="From Al Rabieh "
                    price="To Al Jandweel"
                    info={[`House Space: ${item.houseSpace}`, `Services:`, unpackFurniture, wrappingClothes, Cleaning, 'Date: 1/3/2020']}
                    button={{ title: '  View more' }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={"#E0E1E3"}
                    leftComponent={{ icon: 'md-menu', type: 'ionicon', color: "#FFF", size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) } }}
                    centerComponent={<Text style={styles.headerTitleStyle}>Offers</Text>}
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
                />
                <Container>
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#72BE44' }}>
                        <Tab activeTabStyle={{ backgroundColor: 'red' }} heading={<TabHeading style={styles.borderBottom} ><Text>Pending</Text></TabHeading>}>
                            {this.state.offers.length ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.offers}
                                    renderItem={this.newData}
                                />
                                :
                                <Text> There is no offers yet </Text>
                            }
                        </Tab>
                        <Tab heading={<TabHeading><Text>Accepted</Text></TabHeading>}>
                            {this.state.offers.length ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.offers}
                                    renderItem={this.newData}
                                />
                                :
                                <Text> There is no offers yet </Text>
                            }
                        </Tab>
                    </Tabs>
                </Container>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    borderBottom: {
        borderBottomColor: '#72BE44',
        borderColor: '#72BE44',

    },
    container: {
        flex: 1,
    },
    innerContainer: {
        marginTop: 40
    }
})