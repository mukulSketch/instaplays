import React, {useState, useEffect, memo, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {api_key, baseUrl} from '../../services/config';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Header';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Discover = memo(() => {
  let navigation = useNavigation();
  const flatListRef = useRef(null);
  const translateY = useRef(new Animated.Value(400)).current;

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [movieData, setMovieData] = useState([]);
  let redVal = useSelector(state => state.status);

  useEffect(() => {
    const ac = new AbortController();
    dataFetching();
    return () => {
      ac.abort();
    };
  }, [currentPage]);

  async function dataFetching() {
    var Data = await axios.get(
      `${baseUrl}/trending/${activeCategory}/day?api_key=${api_key}&page=${currentPage}`,
    );
    setMovieData([...movieData, ...Data.data.results]);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  }

  async function categoryChange(category) {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
    Animated.timing(translateY, {
      toValue: height,
      duration: 200, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
    var Data = await axios.get(
      `${baseUrl}/trending/${category}/week?api_key=${api_key}&page=1`,
    );
    setMovieData([...Data.data.results]);
    setTimeout(() => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300, // Animation duration in milliseconds
        useNativeDriver: true,
      }).start();
    }, 200);
  }

  return (
    <LinearGradient
      colors={['#16222A', '#0C111B', '#3A6073']}
      style={styles.mainBody}>
      <Header />
      <View
        style={{
          flexDirection: 'row',
          padding: 7,
          paddingLeft: 0,
          backgroundColor: '#262626',
        }}>
        <TouchableOpacity
          onPress={() => {
            // setCurrentPage(0);
            activeCategory !== 'all' &&
              (setActiveCategory('all'), categoryChange('all'));
          }}
          style={[
            styles.categoryButton,
            {borderColor: activeCategory == 'all' ? '#fff' : 'grey'},
          ]}>
          <Text
            style={[
              styles.categoryText,
              {color: activeCategory == 'all' ? '#fff' : 'grey'},
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setCurrentPage(0);
            activeCategory !== 'movie' &&
              (setActiveCategory('movie'), categoryChange('movie'));
          }}
          style={[
            styles.categoryButton,
            {borderColor: activeCategory == 'movie' ? '#fff' : 'grey'},
          ]}>
          <Text
            style={[
              styles.categoryText,
              {color: activeCategory == 'movie' ? '#fff' : 'grey'},
            ]}>
            Movies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setCurrentPage(0);
            activeCategory !== 'tv' &&
              (setActiveCategory('tv'), categoryChange('tv'));
          }}
          style={[
            styles.categoryButton,
            {borderColor: activeCategory == 'tv' ? '#fff' : 'grey'},
          ]}>
          <Text
            style={[
              styles.categoryText,
              {color: activeCategory == 'tv' ? '#fff' : 'grey'},
            ]}>
            Web Series
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{transform: [{translateY: translateY}]}}>
        <FlatList
          ref={flatListRef}
          scrollEnabled={true}
          data={movieData}
          numColumns={2}
          onEndReachedThreshold={0.1}
          style={{
            marginBottom: height / 9,
          }}
          keyExtractor={item => Math.random().toString(item.index).substr(2, 9)}
          onEndReached={() => {
            setCurrentPage(perv => perv + 1);
          }}
          renderItem={({item, index}) => {
            return (
              <View style={{padding: 10}} key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MovieDetail', {
                      movieId: item.id,
                      tv: item.original_name ? true : false,
                    });
                  }}
                  style={{
                    backgroundColor: '#2d2d2d',
                    marginTop: 15,
                    borderRadius: 8,
                  }}>
                  <Image
                    style={{
                      aspectRatio: 524 / 786,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    source={{
                      uri:
                        'https://image.tmdb.org/t/p/original' +
                        item.poster_path,
                    }}
                  />
                  <View
                    style={{
                      padding: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#fff',
                          fontSize: 15,
                          width: width / 2.5,
                        }}>
                        {item.original_name ? item.original_name : item.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 7,
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Ionicons name="star" size={14} color={'#ffbe15'} />
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 14,
                              marginLeft: 4,
                            }}>
                            {parseFloat(item.vote_average.toFixed(1))} / 10
                          </Text>
                        </View>
                        <View>
                          <FontAwesome
                            name="play-circle"
                            color={'#ffbe15'}
                            size={23}
                          />
                        </View>
                      </View>
                    </View>
                    {/* <FontAwesome name="play-circle" color={'#ffbe15'} size={25} /> */}
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </Animated.View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  mainBody: {
    backgroundColor: '#0C111B',
    flex: 1,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  categoryButton: {
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    padding: 4,
    marginLeft: 12,
  },
});

export default Discover;
