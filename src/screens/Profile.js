import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';

const Profile = ({navigation}) => {
    
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0C111B'}}>
      <Header />
      <View style={styles.mainBody}>
        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 17,
              textAlign: 'center',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}>
            Are you sure want to logout?
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                width: '40%',
                padding: 7,
                borderColor: '#FF5E62',
                borderRadius: 5,
              }}>
              <Text
                style={{color: '#FF5E62', textAlign: 'center', fontSize: 16}}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signin');
              }}
              style={{
                borderWidth: 1,
                width: '40%',
                padding: 7,
                borderColor: '#FF5E62',
                borderRadius: 5,
                backgroundColor: '#FF5E62',
              }}>
              <Text style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
