import React, {memo} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Card = memo(({data}) => {
  let navigation = useNavigation();
  return (
    <FlatList
      scrollEnabled={true}
      data={data}
      horizontal={true}
      onEndReachedThreshold={0.1}
      keyExtractor={item => Math.random().toString(item.index).substr(2, 9)}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MovieDetail', {
                movieId: item.id,
                tv: item.original_name ? true : false,
              });
            }}
            style={{
              marginTop: 15,
              margin: 8,
              borderRadius: 8,
              backgroundColor: '#2d2d2d',
            }}>
            <Image
              style={{
                aspectRatio: 524 / 786,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              source={{
                uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
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
                    fontSize: 14,
                    width: width / 3.7,
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="star" size={14} color={'#ffbe15'} />
                    <Text style={{color: '#fff', fontSize: 14, marginLeft: 4}}>
                      {parseFloat(item.vote_average.toFixed(1))} / 10
                    </Text>
                  </View>
                  <View>
                    <FontAwesome
                      name="play-circle"
                      color={'#ffbe15'}
                      size={20}
                    />
                  </View>
                </View>
              </View>
              {/* <FontAwesome name="play-circle" color={'#ffbe15'} size={25} /> */}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
});

export default Card;
