import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  Pressable,
} from 'react-native';
const Ani = () => {
  const {width, height} = Dimensions.get('window');
  let scrollx = useRef(new Animated.Value(0)).current;
  let design = useRef(new Animated.Value(0)).current;
  const [designEnable, setDesignEnable] = useState(false);

  const data = [
    'https://cdn.dribbble.com/users/3281732/screenshots/8159457/media/9e7bfb83b0bd704e941baa7a44282b22.jpg?resize=1600x1200&vertical=center',
    'https://cdn.dribbble.com/users/3281732/screenshots/6917895/samji_illustrator_4x.jpg?resize=1600x1200&vertical=center',
    'https://cdn.dribbble.com/users/3281732/screenshots/6719695/samji_illustrator_4x.jpeg?resize=1600x1200&vertical=center',
    'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?resize=800x600&vertical=center',
    'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator_4x.jpeg?resize=1600x1200&vertical=center',
  ];
  const handleScroll = event => {
    scrollx.setValue(event.nativeEvent.contentOffset.x);
    Animated.timing(design, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View>
      <StatusBar hidden />
      {data.map((res, index) => {
        let inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        let opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.Image
            key={index}
            source={{uri: res}}
            style={{
              position: 'absolute',
              width: width,
              height: height,
              backgroundColor: 'powderblue',
              opacity,
            }}
            blurRadius={15}
          />
        );
      })}
      <Animated.FlatList
        onScroll={handleScroll}
        data={data}
        pagingEnabled
        horizontal={true}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              Animated.timing(design, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
              }).start();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: width,
              height: height,
            }}>
            <Animated.View
              style={{
                width: width / 1.3,
                height: height / 1.8,
                transform: [
                  {
                    translateY: design.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, height / 7],
                    }),
                  },
                  {
                    scale: design.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    }),
                  },
                ],
              }}>
              <Animated.Image
                style={{
                  // aspectRatio: 1600 / 1200,
                  width: '100%',
                  height: '100%',
                  borderRadius: 13,
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
                source={{uri: item}}
              />
            </Animated.View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Ani;
