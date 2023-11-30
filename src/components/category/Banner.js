import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Banner = () => {
  const navigation = useNavigation();
  const {height, width} = Dimensions.get('window');

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MovieDetail', {
          movieId: '575264',
          tv: false,
        });
      }}
      style={{
        alignItems: 'center',
        margin: 15,
        justifyContent: 'flex-end',
      }}>
      <Image
        style={{
          aspectRatio: 524 / 786,
          borderRadius: 8,
          height: height / 2,
          // width: width / 1.3,
        }}
        source={{
          uri: 'https://image.tmdb.org/t/p/original/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
        }}
      />
      <LinearGradient
        style={{
          alignItems: 'center',
          position: 'absolute',
          padding: 10,
          width: width / 1.4,
        }}
        colors={['#ffffff00', '#1f1f1fc9', '#000000c9']}>
        <Text
          style={{
            color: '#fff',
            fontSize: 17,
            textAlign: 'center',
            fontFamily: 'Roboto-Bold',
          }}>
          Mission: Impossible – Dead Reckoning Part One
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Banner;
