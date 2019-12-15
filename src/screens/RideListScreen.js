import React from 'react';
import { RideList } from '../components';
import { 
   StyleSheet,
   View,
   Text,
   StatusBar,
   Image,
   TouchableWithoutFeedback
  } from 'react-native';
import { Header } from 'react-native-elements';
import { colors } from '../common/theme';
import Client from '../API/Client'
export default class RideListPage extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            myrides:[],
            noData:false
            //currentUser:firebase.auth().currentUser,
        }
    }

    componentDidMount(){
        this.getMyRides();
    }

    
  //Go to ride details page
  goDetails(item, index){
    if(item && item.trip_cost >0){
        item.roundoffCost = Math.round(item.trip_cost).toFixed(2);
        item.roundoff = (Math.round(item.roundoffCost)-item.trip_cost).toFixed(2);
        this.props.navigation.push('RideDetails',{data:item});
    }else{
        item.roundoffCost = Math.round(item.estimate).toFixed(2);
        item.roundoff = (Math.round(item.roundoffCost)-item.estimate).toFixed(2);
        this.props.navigation.push('RideDetails',{data:item});
    }
    
  }

  //Fetching My Rides
  getMyRides(){
    Client.get(`requests/me/requests`).then((res)=>{
        debugger
        if(res.data=="No requests yet") {
            this.setState({noData : true})
        } else {
        this.setState({myrides:res.data , noData:false})
        }
    })
  } 


  render() {
    return (
        <View style={styles.mainView}>
            <Header 
                backgroundColor={colors.GREY.default}
                leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                centerComponent={<Text style={styles.headerTitleStyle}>My Rides</Text>}
                outerContainerStyles={styles.headerStyle}
                innerContainerStyles={{marginLeft:10, marginRight: 10}}
            />
            {!this.state.noData ? 
            <RideList onPressButton={(item, index) => {this.goDetails(item, index)}} data ={this.state.myrides}></RideList>
            : <View style={styles.container}>
            <View style={styles.notifyStyle}>
                <Image
                    style={styles.imageStyle}
                    source={require('../../assets/images/Notification.png')}
                />      
                <Text style={{fontSize:20, marginTop:20, fontWeight:'bold'}}>No requests yet</Text>    
            </View> 
        </View>  }
         </View>
        );
    }
}

const styles = StyleSheet.create({
   
    notifyStyle:{
        alignItems:'center',
        marginTop:150
    },
    
    imageStyle:{
        width: 80, 
        height: 100
    },
    container:{
        zIndex:999,
        flex:1
    },
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    containerView:{ flex:1 },
    textContainer:{textAlign:"center"},
    mainView:{
        flex:1, 
        backgroundColor: colors.WHITE, 
        marginTop: StatusBar.currentHeight 
    } 
});
