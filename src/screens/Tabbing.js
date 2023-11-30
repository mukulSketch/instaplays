import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MovieList from './MovieList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Search from './Search';
import {Text} from 'react-native';
import Profile from './Profile';
import Discover from '../components/category/Discover';

const Tab = createBottomTabNavigator();

function Tabbing() {
  return (
    <Tab.Navigator
      initialRouteName="MovieList"
      backBehavior="firstRoute"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#262626',
          height: 55,
          borderColor: '#262626',
        },
        tabBarLabel: ({children, focused}) => {
          return (
            <Text
              style={{
                color: focused ? '#fff' : 'grey',
                paddingBottom: 4,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              {children}
            </Text>
          );
        },
        tabBarLabelStyle: {
          color: '#89ACD7',
          fontSize: 13,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Foundation name="home" size={24} color={'#fff'} />
            ) : (
              <Octicons name="home" size={23} color={'grey'} />
            ),
        }}
        name="Home"
        component={MovieList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="trending-up-sharp" size={26} color={'#fff'} />
            ) : (
              <Ionicons name="trending-up-sharp" size={25} color={'grey'} />
            ),
        }}
        name="Trending"
        component={Discover}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="search" size={23} color={'#fff'} />
            ) : (
              <Ionicons name="search" size={23} color={'grey'} />
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
              <FontAwesome name="user-o" size={23} color={'grey'} />
            ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default Tabbing;
