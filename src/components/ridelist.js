import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '../common/theme';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


export default class RideList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            marginBottom:1,
            region: {
                latitude: 31.963158,
                longitude: 35.930359,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
        }
      }

      onPressButton(item, index) {
          const { onPressButton } = this.props;
          onPressButton(item, index)
      }
    
    //flatlist return function
    newData = ({item, index}) =>{
        let Size = '';
        if(item.size == "L") {
            Size = "Large Size"
        } else if(item.size == "M"){
            Size = "Medium Size"
        } else {
            Size = "Small Size"
        }
        let region ={
            latitude: parseInt(item.current.lat),
            longitude: parseInt(item.current.lng),
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
        }
       const { onPressButton } = this.props;
        return(
        <View style={{flex:1, height:150, marginBottom:10}}>  
        <View style={{flex:1, flexDirection:'row',justifyContent:'space-between', paddingTop:10, paddingLeft:5, paddingRight:5}}>
            <Text style={{textAlign:'left', marginRight:50, fontSize:16}}>{item.endTime.substring(0, item.endTime.length - 12)}</Text>
            <View></View>
            <Text style={{textAlign:'right', fontSize:16, color: '#70B32F'}}>{parseFloat(item.price).toFixed(2)} JOD</Text>
        </View>
        <Text style={{paddingLeft:5, color:"#6F6F6F", fontSize:16, paddingBottom:5}}>{Size}</Text>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={[styles.map,{ marginBottom: this.state.marginBottom }]}
                region={region}
                onMapReady={() => this.setState({ marginBottom: 1 })}
            >
                <Marker.Animated
                    coordinate={{latitude: parseInt(item.current.lat), longitude: parseInt(item.current.lng)}}
                    image={require('../../assets/images/rsz_2red_pin.png')}
                    style={{width:400}}
                />
                  <MapViewDirections
                            origin={{latitude: parseInt(item.current.lat), longitude: parseInt(item.current.long)}}
                            destination={{latitude: parseInt(item.destination.lat), longitude: parseInt(item.destination.lng)}}
                            apikey={'AIzaSyDqnzeDBnNoa_5yDnZj5doqjnoim2YkLKE'}
                />
            
                    <Marker.Animated
                    coordinate={{latitude: parseInt(item.destination.lat), longitude: parseInt(item.destination.lng)}}
                    image={require('../../assets/images/available_car.png')}
                    style={{width:400}}
                />
          
             
            </MapView>
            <View style={{backgroundColor:'grey', width:'100%', marginTop:10, height:2}}></View>
        </View>
        )
    }

    render() {   
        const {data} =this.props
        
        return(
            <View style={styles.textView3}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    renderItem={this.newData}
                />
            </View>
        ); 
    }
};

const styles = StyleSheet.create({
    textView3:{
        flex: 1,
    },
    map: {
        flex: 3,
    },
});