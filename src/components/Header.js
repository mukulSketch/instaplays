import React from 'react'
import {
    StatusBar,
    Text,
    View,
  } from 'react-native';

const Header = () => {
  return (
    <View>
    <StatusBar backgroundColor={'#1C2E48'} />
    <View style={{backgroundColor: '#263F61', padding: 13}}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
        Insta Play
      </Text>
    </View>
    </View>
  )
}

export default Header