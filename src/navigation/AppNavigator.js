import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import { AuthStack, RootNavigator, DriverRootNavigator, } from './MainNavigator';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';

const AppNavigator= createSwitchNavigator({
        // You could add another route here for authentication. AounkApp@123 AounkApp366@gmail.com
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
            AuthLoading: AuthLoadingScreen,
            Auth: AuthStack,
            DriverRoot: DriverRootNavigator
        },
        {
            initialRouteName: 'Auth'
        }
    );
    const AppContainer = createAppContainer(AppNavigator);
    export default AppContainer;
  