import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import {
    EmptyNotificationPage,
    ProfileScreen, 
    RideListPage, 
    NotificationPage,
    LoginScreen,
    DriverTripAccept,
    EditProfilePage,
    AboutPage,
    PinCodeScreen,
    PhoneLand,
    RegistrationPage,
    UploadDocs,
} from '../screens';
import SideMenu from '../components/SideMenu';
import  { Dimensions } from 'react-native';
var { width, height } = Dimensions.get('window');

//app stack for user end
    export const AppStack = {
        UploadDocs:{
            screen: UploadDocs,
            navigationOptions:{
                header:null
            }
        },
        RideList:{
            screen: RideListPage,
            navigationOptions:{
            header:null,
            }
            
        },
        Notifications:{
            screen:NotificationPage,
            navigationOptions:{
                header:null,
                }
        },
        EmptyNotification:{
            screen:EmptyNotificationPage,
            navigationOptions:{
                header:null,
            }
        },
       
        Profile: {
            screen: ProfileScreen,
            navigationOptions:{
                header: null
            }
        },
        DriverTripAccept: {
            screen: DriverTripAccept,
            navigationOptions:{
                header: null
            }
        },
        
       
       
        editUser:{
            screen: EditProfilePage,
            navigationOptions:{
                header: null
            } 
        },
        About: {
            screen: AboutPage,
            navigationOptions:{
                header: null
            }
        },
    }

    //authentication stack for user before login
    export const AuthStack = createStackNavigator({
        Notifications:{
            screen:NotificationPage,
            navigationOptions:{
                header:null,
                }
        },
        UploadDocs:{
            screen: UploadDocs,
            navigationOptions:{
                header:null
            }
        },
        PinCodeScreen: {
            screen:PinCodeScreen,
            navigationOptions:{
                header: null
            }
        },
        PhoneLand:{
            screen:PhoneLand,
            navigationOptions:{
                header:null
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions:{
                header:null,
            }
        },
        Reg: {
            screen:  RegistrationPage,
            navigationOptions:{
                header:null,
            }
        },     
    },{
        initialRouteName: 'Reg',
    });

    const DrawerRoutes = {
        'RideList': {
            name: 'RideList',
            screen: createStackNavigator(AppStack, { initialRouteName: 'RideList',headerMode: 'none' })
        },
        'Profile': {
            name: 'Profile',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Profile', headerMode: 'none' })
        },
        'Notifications': {
            name: 'Notifications',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Notifications', headerMode: 'none' })
        },
        'DriverTripAccept': {
            name: 'DriverTripAccept',
            screen: createStackNavigator(AppStack, { initialRouteName: 'DriverTripAccept',headerMode: 'none' })
        },
        'About': {
            name: 'About',
            screen: createStackNavigator(AppStack, { initialRouteName: 'About',headerMode: 'none' })
        }
    };


    export const DriverRootNavigator = createDrawerNavigator(
        DrawerRoutes,
        {
        drawerWidth: width/1.9,
        initialRouteName:'DriverTripAccept',
        contentComponent: SideMenu,
    });

