import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import {api_key, baseUrl} from '../services/config';

const {height, width} = Dimensions.get('window');

const MovieDetail = ({route}) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const {movieId} = route.params;

  useEffect(() => {
    const ac = new AbortController();
    getMovieDetail();

    return () => {
      ac.abort();
    };
  }, []);

  const getMovieDetail = async () => {
    let details = await axios.get(
      `${baseUrl}/movie/${movieId}?api_key=${api_key}&language=en-US`,
    );
    setMovieDetails([details.data]);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0C111B'}}>
      <Header />
      <ScrollView>
        {movieDetails.map((res, index) => (
          <View key={index}>
            <View
              style={{width: width, height: height / 2.3, overflow: 'hidden'}}>
              <Image
                style={{
                  aspectRatio: 543 / 815,
                  width: '100%',
                }}
                source={{
                  uri: 'https://image.tmdb.org/t/p/original' + res.poster_path,
                }}
              />
            </View>
            <View style={styles.mainBody}>
              <Text style={{color: '#fff', fontSize: 19, fontWeight: 'bold'}}>
                {res.original_title}
              </Text>
              <Text style={{color: '#fff', fontSize: 18, marginTop: 6}}>
                Rating: {parseFloat(res.vote_average.toFixed(2)) / 2}/5
              </Text>
              <Text
                style={{
                  color: '#ffffffc7',
                  fontSize: 18,
                  marginTop: 15,
                  lineHeight: 26,
                }}>
                {res.overview}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: height / 30,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 18, width: '50%'}}>
                  Release Date
                </Text>
                <Text style={{color: '#fff', fontSize: 17}}>
                  {res.release_date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 17,
                  marginBottom: 20
                  // alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 18, width: '50%'}}>
                  Original Language
                </Text>
                <View
                  style={{
                    overflow: 'hidden',
                    width: '50%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {res.spoken_languages.map((language, ind) => (
                    <Text style={{color: '#fff', fontSize: 17}} key={ind}>
                      {language.english_name}
                      {ind + 1 < res.spoken_languages.length && ', '}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: height / 30,
  },
});

export default MovieDetail;
