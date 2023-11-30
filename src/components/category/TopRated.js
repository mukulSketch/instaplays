import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {api_key, baseUrl} from '../../services/config';
import CustomHeading from '../ui/CustomHeading';
import Card from '../ui/Card';

const TopRated = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies();
    return () => {
      ac.abort();
    };
  }, []);

  const fetchMovies = async () => {
    try {
      const list = await axios.get(
        `${baseUrl}/movie/top_rated?api_key=${api_key}&language=en-US&page=1`,
      );
      setMovieList(list.data.results);
    } catch (err) {
      console.log(err, 'jj');
    }
  };

  return (
    <View>
      <CustomHeading>Top Rated</CustomHeading>
      <Card data={movieList} />
    </View>
  );
};

export default TopRated;
