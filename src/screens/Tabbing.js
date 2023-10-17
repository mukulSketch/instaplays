import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MovieList from './MovieList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Search from './Search';
import {Text} from 'react-native';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function Tabbing() {

  return (
    <Tab.Navigator
      initialRouteName="MovieList"
      backBehavior='firstRoute'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#26476F', height: 60},
        tabBarLabel: ({children, focused}) => {
          return (
            <Text
              style={{color: focused ? '#fff' : '#89ACD7', paddingBottom: 4}}>
              {children}
            </Text>
          );
        },
        tabBarLabelStyle: {
          color: '#89ACD7',
          fontSize: 13,
          paddingBottom: 4,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="home" size={25} color={'#fff'} />
            ) : (
              <Ionicons name="home-outline" size={25} color={'#89ACD7'} />
            ),
        }}
        name="Home"
        component={MovieList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="search" size={25} color={'#fff'} />
            ) : (
              <Ionicons name="search" size={25} color={'#89ACD7'} />
            ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome name="user" size={23} color={'#fff'} />
            ) : (
              <FontAwesome name="user-o" size={23} color={'#89ACD7'} />
            ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default Tabbing;
