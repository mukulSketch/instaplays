import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import Tabbing from './src/screens/Tabbing';
import MovieDetail from './src/screens/MovieDetail';
import Profile from './src/screens/Profile';
// import MovieList from './src/screens/MovieList';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen
          name="Signin"
          component={Signin}
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
          {/* <Stack.Screen
          name="Movies"
          component={MovieList}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
