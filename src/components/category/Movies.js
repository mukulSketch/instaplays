import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {api_key, baseUrl} from '../../services/config';
import CustomHeading from '../ui/CustomHeading';
import Card from '../ui/Card';

const Movies = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    dataFetching();
    return () => {
      ac.abort();
    };
  }, []);

  async function dataFetching() {
    var Data = await axios.get(
      `${baseUrl}/trending/all/week?api_key=${api_key}&page=1`,
    );
    setMovieData([...movieData, ...Data.data.results]);
  }
  return (
    <View>
      <CustomHeading>Trending</CustomHeading>
      <Card data={movieData} />
    </View>
  );
};

export default Movies;
