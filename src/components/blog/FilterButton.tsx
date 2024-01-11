import React, {FC} from 'react';
import {Text, View, Pressable} from 'react-native';

interface FilterButtonProps {
  ButtonText: String;
  data: Array<{country: String}>;
  setCountry: (country: String) => void;
  country: string;
}
const FilterButton: FC<FilterButtonProps> = ({
  ButtonText,
  data,
  setCountry,
  country,
}) => {
  return (
    <Pressable
      onPress={() => {
        setCountry(ButtonText);
      }}
      style={{
        backgroundColor: ButtonText == country ? '#D6F3FF' : '#fff',
        borderWidth: 1,
        borderColor: ButtonText == country ? '#01C0FC' : '#d2d2d2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        flexDirection: 'row',
        paddingHorizontal: 6,
      }}>
      <Text style={{color: '#000', fontSize: 15, marginHorizontal: 10}}>
        {ButtonText}
      </Text>
      <View
        style={{
          backgroundColor: 'dodgerblue',
          padding: 3,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{marginHorizontal: 8, fontSize: 10, color: '#fff'}}>
          {ButtonText == 'All'
            ? data.length
            : data.filter(re => re.country == ButtonText).length}
        </Text>
      </View>
    </Pressable>
  );
};

export default FilterButton;
