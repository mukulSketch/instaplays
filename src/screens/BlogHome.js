import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FilterButton from '../components/blog/FilterButton';
import {useSelector} from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const BlogHome = () => {
  let std = useSelector(state => state.appStatus);
  const {darkTheme, login, data} = std.status;
  const drawer = useRef(new Animated.Value(0)).current;
  const [articleData, setArticleData] = useState(data);
  const [country, setCountry] = useState('All');
  const [countryNames, setCountryNames] = useState([
    'All',
    'Germany',
    'India',
    'United Kingdom',
  ]);
  const [datePicker, setDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [authorNames, setAuthorNames] = useState([]);
  const [showAuthor, setShowAuthor] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [FilterData, setFilterData] = useState([]);

  function formatStartDate(date, msg) {
    const inputDate = moment(date);
    const formattedDate = inputDate.format('MMM DD YYYY');
    msg == 'END_DATE'
      ? (setEndDate(formattedDate), setDatePicker(false))
      : setStartDate(formattedDate);
  }

  const uniqueCategoriesSet = new Set();

  data.forEach(item => {
    item.category.forEach(category => {
      uniqueCategoriesSet.add(category);
    });
  });

  let uniqueAuthor = new Set();

  data.forEach(item => {
    uniqueAuthor.add(item.author);
  });

  // Convert Set to an array
  const uniqueCategoriesArray = [...uniqueCategoriesSet];

  function categoryFilters(category) {
    if (categoryFilter.includes(category)) {
      let ind = categoryFilter.indexOf(category);
      categoryFilter.splice(ind, 1);
      setCategoryFilter([...categoryFilter]);
    } else {
      setCategoryFilter([...categoryFilter, category]);
    }
  }

  function authorFilter(auth) {
    if (authorNames.includes(auth)) {
      let ind = authorNames.indexOf(auth);
      authorNames.splice(ind, 1);
      setAuthorNames([...authorNames]);
    } else {
      setAuthorNames([...authorNames, auth]);
    }
  }
  Animated.timing(drawer, {
    toValue: drawerOpen ? 1 : 0,
    duration: 300,
    useNativeDriver: false,
  }).start();

  function compareDate(dateString1) {
    const date1 = moment.utc(dateString1, 'MMM DD YYYY');
    const start = moment.utc(startDate, 'MMM DD YYYY');
    const end = moment.utc(endDate, 'MMM DD YYYY');
    // Compare dates
    if (date1.isSameOrBefore(end) && date1.isSameOrAfter(start)) {
      return true;
    } else {
      return false;
    }
  }

  function compareArray(arr) {
    return arr.some(res => categoryFilter.includes(res));
  }

  function applyFilter() {
    let filterData = [];
    if (startDate && endDate) {
      filterData = data.filter(res => compareDate(res.date));
    }
    if (categoryFilter.length) {
      filterData = data.filter(res => compareArray(res.category));
    }
    if (authorNames.length) {
      filterData = data.filter(res => authorNames.includes(res.author));
    }
    setFilterData([...filterData]);
    setDrawerOpen(false);
  }

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          width: width,
          position: 'absolute',
          height: height,
          backgroundColor: '#00000099',
          zIndex: 2,
          padding: 20,
          opacity: drawer.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          marginLeft: drawer.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, 0],
          }),
        }}>
        <Animated.View
          style={{
            width: width / 1.5,
            position: 'absolute',
            height: height,
            backgroundColor: '#fff',
            zIndex: 2,
            padding: 20,
            marginLeft: drawer.interpolate({
              inputRange: [0, 1],
              outputRange: [-width, 0],
            }),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 17, width: '50%'}}>
              Filters
            </Text>
            <Pressable
              style={{
                width: '50%',
                alignItems: 'flex-end',
              }}
              onPress={() => {
                setDrawerOpen(false);
              }}>
              <Text style={{color: '#000', fontSize: 17}}>Close</Text>
            </Pressable>
          </View>
          <View style={{padding: 10, marginTop: 20}}>
            <Text
              style={{
                fontSize: 16,
                color: 'grey',
              }}>
              Select Date
            </Text>
            {!datePicker ? (
              <Pressable
                onPress={() => {
                  setDatePicker(!datePicker);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  padding: 11,
                  borderRadius: 5,
                  marginTop: 9,
                }}>
                <Text style={{color: startDate && endDate ? '#000' : 'grey'}}>
                  {startDate && endDate
                    ? startDate + ' to ' + endDate
                    : 'Choose from & to date'}
                </Text>
              </Pressable>
            ) : (
              <View style={{marginTop: 40}}>
                <CalendarPicker
                  width={width / 1.5}
                  startFromMonday={true}
                  allowRangeSelection={true}
                  todayBackgroundColor="#f2e6ff"
                  selectedDayColor="#7300e6"
                  selectedDayTextColor="#FFFFFF"
                  onDateChange={(str, end) => {
                    formatStartDate(str, end);
                  }}
                />
              </View>
            )}
            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginTop: 12,
              }}>
              Category
            </Text>
            <Pressable
              onPress={() => {
                setShowCategory(!showCategory);
              }}
              style={{
                borderWidth: 1,
                borderColor: '#EBEBEB',
                padding: 11,
                borderRadius: 5,
                marginTop: 9,
              }}>
              <Text style={{color: 'grey'}}>Select category</Text>
            </Pressable>
            {showCategory && (
              <View style={{backgroundColor: 'whitesmoke'}}>
                {uniqueCategoriesArray.map((res, index) => (
                  <Pressable
                    onPress={() => {
                      categoryFilters(res);
                    }}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        width: 15,
                        height: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: 'grey',
                        backgroundColor: categoryFilter.includes(res)
                          ? 'dodgerblue'
                          : '#fff',
                      }}>
                      <MaterialIcons name="check" size={12} color={'#fff'} />
                    </View>
                    <Text style={{color: '#000', marginLeft: 7}}>{res}</Text>
                  </Pressable>
                ))}
              </View>
            )}
            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginTop: 12,
              }}>
              Author
            </Text>
            <Pressable
              onPress={() => {
                setShowAuthor(!showAuthor);
              }}
              style={{
                borderWidth: 1,
                borderColor: '#EBEBEB',
                padding: 11,
                borderRadius: 5,
                marginTop: 9,
              }}>
              <Text style={{color: 'grey'}}>Select Author</Text>
            </Pressable>
            {showAuthor && (
              <View style={{backgroundColor: 'whitesmoke'}}>
                {[...uniqueAuthor].map((res, index) => (
                  <Pressable
                    onPress={() => {
                      authorFilter(res);
                    }}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        width: 15,
                        height: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: 'grey',
                        backgroundColor: authorNames.includes(res)
                          ? 'dodgerblue'
                          : '#fff',
                      }}>
                      <MaterialIcons name="check" size={12} color={'#fff'} />
                    </View>
                    <Text style={{color: '#000', marginLeft: 7}}>{res}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
          <Pressable
            onPress={() => {
              applyFilter();
            }}
            style={{
              backgroundColor: '#01C0FC',
              padding: 10,
              borderWidth: 0,
              borderRadius: 5,
              marginTop: 100,
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Apply Filter
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
      <View
        style={{
          backgroundColor: '#FBFBFB',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'dodgerblue', fontSize: 19, fontWeight: 'bold'}}>
          Logo
        </Text>
        <View
          style={{
            backgroundColor: '#BFEEFF',
            height: height / 33,
            width: height / 33,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: height / 33,
          }}>
          <Text style={{fontSize: 14, color: '#000'}}>M</Text>
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 18, color: '#000'}}>Articles</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{marginTop: 12}}>
          <Pressable
            onPress={() => {
              setDrawerOpen(true);
              // drawerAnimation();
            }}
            style={{
              backgroundColor: '#fff',
              padding: 6,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 4,
            }}>
            <MaterialIcons name="tune" size={21} color={'#000'} />
          </Pressable>
          {countryNames.map((res, index) => (
            <FilterButton
              key={index}
              ButtonText={res}
              country={country}
              setCountry={setCountry}
              data={data}
            />
          ))}
        </ScrollView>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            FilterData.length
              ? FilterData
              : country == 'All'
              ? articleData
              : articleData.filter(
                  countryData => countryData.country == country,
                )
          }
          scrollEnabled={true}
          style={{marginBottom: height / 5, marginTop: height / 60}}
          renderItem={({item}) => {
            return (
              <View style={{marginBottom: 20}}>
                <Image
                  style={{
                    aspectRatio: 2832 / 1593,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                  source={{uri: item.image}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    backgroundColor: '#fff',
                    padding: 9,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: width / 1.3}}>
                    <Text style={{color: '#000', fontSize: 17}}>
                      {item.title}
                    </Text>
                    <Text
                      style={{color: '#808080', fontSize: 14, marginTop: 6}}>
                      {item.description}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 11,
                      }}>
                      {item.category.map((res, index) => (
                        <View
                          key={index}
                          style={{
                            backgroundColor: '#DBF6FF',
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginLeft: index > 0 ? 10 : 0,
                            paddingHorizontal: 9,
                          }}>
                          <Text style={{color: '#000'}}>{res}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 5,
                      borderRadius: 5,
                      elevation: 1,
                    }}>
                    <SimpleLineIcons name="options-vertical" size={15} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 9,
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        backgroundColor: '#D7D7D7',
                        height: height / 40,
                        width: height / 40,
                        borderRadius: height / 30,
                        textAlign: 'center',
                      }}>
                      {item.author[0]}
                    </Text>
                    <Text style={{color: '#000', fontSize: 14, marginLeft: 10}}>
                      {item.author}
                    </Text>
                  </View>
                  <Text style={{color: '#000', fontSize: 14}}>{item.date}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          width: width,
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fff',
          padding: 14,
        }}>
        <Pressable
          style={{backgroundColor: '#01C0FC', padding: 10, borderRadius: 7}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            + Add New Article
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BlogHome;
