import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';
import * as firebase from 'firebase'

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync =  () => {
    firebase.auth().onAuthStateChanged((user)=>{
        console.log('user',user)
        if(user && user.displayName){
          const userData=firebase.database().ref('users/'+user.uid);
          userData.once('value',userData=>{
            if(userData.val()) {
              if(userData.val().usertype == 'driver' && userData.val().approved == true){
                this.props.navigation.navigate('DriverRoot');
               }
               else if(userData.val().approved == false) {
                firebase.auth().signOut();
                alert('Your account is not approved yet as driver');
               }
               else{ 
                firebase.auth().signOut();
                alert('Your account not exist as driver');
               }
            }
          })
        }else{
          this.props.navigation.navigate('Auth');
        }
    })
  };

    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync =  () => {
      firebase.auth().onAuthStateChanged((user)=>{
          if(user && user.displayName){
            const userData=firebase.database().ref('users/'+user.uid);
            userData.once('value',userData=>{
               if(userData.val()){
                  if(userData.val().usertype == 'rider') {
                    // this.registerForPushNotificationsAsync(user)
                    this.props.navigation.navigate('Root');
                  }
                  else{
                    firebase.auth().signOut();
                    alert('Your account not exist');
                  }
               }
            })
          }else{
            this.props.navigation.navigate('Auth');
          }
      })
    };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.IndicatorStyle}>
        <ActivityIndicator />
      </View>
    );
  }
}

//style for this component
const styles = StyleSheet.create({
  IndicatorStyle:{
    flex:1, 
    justifyContent:"center"
  }
})