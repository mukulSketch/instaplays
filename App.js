import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import Tabbing from './src/screens/Tabbing';
import MovieDetail from './src/screens/MovieDetail';
import Profile from './src/screens/Profile';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Pressable, Text, View} from 'react-native';
import BlogHome from './src/screens/BlogHome';
import {useDispatch, useSelector} from 'react-redux';
import {appStatus} from './src/redux-toolkit/slice';
import Ani from './src/screens/ani';

const App = () => {
  const Stack = createNativeStackNavigator();

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  let selector = useSelector(state => state.appStatus.status);
  let dispatch = useDispatch();

  return (
    <NavigationContainer>
      {/* <View
        style={{
          padding: 12,
          backgroundColor: '#161A30',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            dispatch(
              appStatus({
                login: selector.login,
                darkTheme: selector.darkTheme,
                data: selector.data,
                movieApp: !selector.movieApp,
              }),
            );
          }}
          style={{
            backgroundColor: '#EEE2DE',
            padding: 5,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              fontSize: 15,
            }}>
            {selector.movieApp ? 'Blog app' : 'movie app'}
          </Text>
        </Pressable>
      </View> */}
      <Stack.Navigator initialRouteName="ani">
        {selector.movieApp ? (
          <Stack.Screen
            name="Tab"
            component={Tabbing}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="BlogHome"
            component={BlogHome}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="ani"
          component={Ani}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Signin"
          component={Signin}
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
