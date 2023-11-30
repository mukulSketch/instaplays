import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Popular from '../components/category/Popular';
import Movies from '../components/category/Movies';
import TopRated from '../components/category/TopRated';
import Upcoming from '../components/category/Upcoming';
import Banner from '../components/category/Banner';

const MovieList = () => {
  const outerData = [{id: '2', outerText: 'Outer Item 2'}];

  const {height} = Dimensions.get('window');
  return (
    <SafeAreaView>
      <Header />
      <LinearGradient
        colors={['#16222A', '#0C111B', '#3A6073']}
        style={styles.mainBody}>
        <FlatList
          scrollEnabled={true}
          data={outerData}
          style={{marginBottom: height / 8.5}}
          renderItem={({item, index}) => (
            <View>
              <Banner />
              <Movies />
              <Popular />
              <TopRated />
              <Upcoming />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    backgroundColor: '#0C111B',
  },
});

export default MovieList;
