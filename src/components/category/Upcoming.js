import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {api_key, baseUrl} from '../../services/config';
import CustomHeading from '../ui/CustomHeading';
import Card from '../ui/Card';

const Upcoming = () => {
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
        `${baseUrl}/movie/upcoming?api_key=${api_key}&language=en-US&page=1`,
      );
      setMovieList(list.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <CustomHeading>Upcoming</CustomHeading>
      <Card data={movieList} />
    </View>
  );
};

export default Upcoming;
