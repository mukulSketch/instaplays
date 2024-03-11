import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {api_key, baseUrl} from '../../services/config';

const Banner = () => {
  const navigation = useNavigation();
  const {height, width} = Dimensions.get('window');
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    dataFetching();
  }, []);

  async function dataFetching() {
    var Data = await axios.get(
      `${baseUrl}/trending/all/week?api_key=${api_key}&page=1`,
    );
    setMovieData(Data?.data?.results[0]);
  }

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
          uri: `https://image.tmdb.org/t/p/original${movieData?.poster_path}`,
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
          {movieData?.original_title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Banner;
