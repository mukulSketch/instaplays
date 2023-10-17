import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {api_key, baseUrl} from '../services/config';

const {height, width} = Dimensions.get('window');

const Search = ({navigation}) => {
  const [movieList, setMovieList] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const items = Array.from({length: 5}, (_, index) => index + 1);

  useEffect(() => {
    const ac = new AbortController();
    searchResults(false);
    return () => {
      ac.abort();
    };
  }, [currentPage]);

  useEffect(() => {
    const ac = new AbortController();

    searchResults(true);

    return () => {
      ac.abort();
    };
  }, [movieName]);

  const searchResults = async querycheck => {
    let movieResult = await axios.get(
      `${baseUrl}/search/movie?api_key=${api_key}&language=en-US&query=${movieName}&page=${currentPage}&include_adult=false`,
    );
    querycheck
      ? (setMovieList([...movieResult.data.results]), setCurrentPage(1))
      : setMovieList([...movieList, ...movieResult.data.results]);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0C111B'}}>
      <Header />
      <View style={styles.mainBody}>
        <View
          style={{
            backgroundColor: '#182135',
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 15,
            paddingLeft: 15,
            marginTop: height / 32,
          }}>
          <TextInput
            value={movieName}
            style={{color: '#fff', fontSize: 16, width: '95%'}}
            placeholder="Search"
            placeholderTextColor={'#4F6492'}
            onChangeText={query => {
              setMovieName(query);
              searchResults(query);
            }}
          />
          {movieName ? (
            <TouchableOpacity
              onPress={() => {
                setMovieName('');
                setCurrentPage(1);
              }}>
              <Ionicons name="close" size={25} color="#4F6492" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search-outline" size={20} color="#4F6492" />
          )}
        </View>
        {movieList.length > 0 ? (
          <FlatList
            style={{marginTop: 15, marginBottom: 25}}
            scrollEnabled={true}
            data={movieList}
            onEndReachedThreshold={0.1}
            keyExtractor={item =>
              Math.random().toString(item.index).substr(2, 9)
            }
            onEndReached={() => {
              setCurrentPage(currentPage + 1);
            }}
            renderItem={({item, index}) => {
              return (
                <View key={Math.random().toString(36).substr(2, 9)}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MovieDetail', {movieId: item.id});
                    }}
                    style={{
                      backgroundColor: '#101623',
                      marginTop: 19,
                      borderRadius: 8,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: width / 2.4,
                        height: height / 9,
                        overflow: 'hidden',
                        borderBottomLeftRadius: 8,
                      }}>
                      {item.poster_path ? (
                        <Image
                          style={{
                            aspectRatio: 524 / 786,
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                          }}
                          source={{
                            uri:
                              'https://image.tmdb.org/t/p/original' +
                              item.poster_path,
                          }}
                        />
                      ) : (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          }}>
                          <Text style={{color: '#fff', fontSize: 18}}>
                            No image
                          </Text>
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        padding: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#fff',
                            fontSize: 16,
                            width: width / 2.2,
                            fontWeight: 'bold',
                          }}>
                          {item.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 7,
                          }}>
                          {items.map((res, ind) => (
                            <View key={ind}>
                              {Math.round(item.vote_average / 2) > ind ? (
                                <Ionicons
                                  name="star"
                                  size={16}
                                  color={'#FFE234'}
                                />
                              ) : (
                                <Ionicons
                                  name="star-outline"
                                  size={16}
                                  color={'#fff'}
                                />
                              )}
                            </View>
                          ))}
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 14,
                              marginLeft: 4,
                            }}>
                            {item.vote_average.toFixed(1) / 2} / 5
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height/1.31,
            }}>
            <Ionicons name="search-outline" size={70} color="#4F6492" />
            <Text style={{color: '#fff', fontSize: 19, fontWeight: 'bold',marginTop: 10}}>
              Search for movies
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default Search;
