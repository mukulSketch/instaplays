import React from 'react';
import {StyleSheet, Text} from 'react-native';

const CustomHeading = ({children}) => {
  return <Text style={style.heading}>{children}</Text>;
};

const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    letterSpacing: 1.7,
  },
});
export default CustomHeading;
