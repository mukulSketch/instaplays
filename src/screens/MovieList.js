import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import {api_key, baseUrl} from '../services/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {height, width} = Dimensions.get('window');

const MovieList = ({navigation}) => {
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const ac = new AbortController();
    dataFetching();
    return () => {
      ac.abort();
    };
  }, [currentPage]);

  async function dataFetching() {
    var Data = await axios.get(
      `${baseUrl}/trending/movie/day?api_key=${api_key}&page=${currentPage}`,
    );
    // console.log(Data.data.results);
    setMovieData([...movieData, ...Data.data.results]);
  }

  return (
    <SafeAreaView>
      <Header />
      <View style={styles.mainBody}>
        <FlatList
          scrollEnabled={true}
          data={movieData}
          onEndReachedThreshold={0.1}
          keyExtractor={item =>  Math.random().toString(item.index).substr(2, 9)}
          onEndReached={() => {
            setCurrentPage(currentPage + 1);
          }}
          renderItem={({item, index}) => {
            return (
              <View key={item.id}>
                {index == 0 && (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 17,
                      marginTop: 12,
                      fontWeight: 'bold',
                    }}>
                    Trending
                  </Text>
                )}
                <TouchableOpacity
                onPress={()=>{
                  navigation.navigate('MovieDetail', {movieId: item.id});
                }}
                  style={{
                    backgroundColor: '#003675',
                    marginTop: 15,
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: height / 5,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        aspectRatio: 524 / 786,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                      // resizeMode={'contain'}
                      source={{
                        uri:
                          'https://image.tmdb.org/t/p/original' +
                          item.poster_path,
                      }}
                    />
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
                          width: width / 1.6,
                        }}>
                        {item.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 7,
                        }}>
                        <Ionicons name="star" size={16} color={'#FFE234'} />
                        <Text
                          style={{color: '#fff', fontSize: 14, marginLeft: 4}}>
                          {parseFloat(item.vote_average.toFixed(1))} / 10
                        </Text>
                      </View>
                    </View>
                    <FontAwesome
                      name="play-circle"
                      color={'#FF9966'}
                      size={35}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    backgroundColor: '#0C111B',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default MovieList;
