import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View>
      <StatusBar backgroundColor={'#262626'} />
      <View
        style={{
          backgroundColor: '#262626',
          padding: 13,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2,
        }}>
        <Ionicons name="play" size={22} color={'#ffbe15'} />
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            marginLeft: 7,
          }}>
          Insta Play
        </Text>
      </View>
    </View>
  );
};

export default Header;
