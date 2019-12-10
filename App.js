import React from 'react';
import { AppLoading } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font'
import * as Icon from '@expo/vector-icons'

import AppContainer from './src/navigation/AppNavigator';

//firebase realtime database import
import * as firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDO0b4wlN_SzkCI_woGDc3T31SAojl4KfM",
    authDomain: "grabcab-f0785.firebaseapp.com",
    databaseURL: "https://grabcab-f0785.firebaseio.com",
    projectId: "grabcab-f0785",
    storageBucket: "grabcab-f0785.appspot.com",
    messagingSenderId: "120078677465",
    appId: "1:120078677465:web:da07d941d4a3a2f0"
};
firebase.initializeApp(config);

export default class App extends React.Component {

  state = {
    assetsLoaded: false,
  };

//resource load at the time of app loading
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/background.png'),
        require('./assets/images/logo.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      }),
    ]);
  };

 

  
  render() {
    return (
        this.state.assetsLoaded ? 
          <AppContainer/>
          :         
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onFinish={() => this.setState({ assetsLoaded: true })}
            onError={console.warn}
            autoHideSplash={true}
          />
    );
  }
}