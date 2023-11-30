import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import Tabbing from './src/screens/Tabbing';
import MovieDetail from './src/screens/MovieDetail';
import Profile from './src/screens/Profile';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import BlogHome from './src/screens/BlogHome';
const App = () => {
  const Stack = createNativeStackNavigator();

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BlogHome">
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlogHome"
          component={BlogHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tab"
          component={Tabbing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
