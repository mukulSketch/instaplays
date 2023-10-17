import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import {api_key, baseUrl} from '../services/config';

const {height} = Dimensions.get('window');

const Signin = () => {
  const navigation = useNavigation();
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [loginError, setloginError] = useState(false);

  const loginValidation = async () => {
    let error = false;
    if (!userName) {
      setuserNameError(true);
      setloginError(false);
      error = true;
    } else {
      setuserNameError(false);
    }
    if (!password) {
      setpasswordError(true);
      setloginError(false);
      error = true;
    } else {
      setpasswordError(false);
    }
    if (!error) {
      let token = await axios.get(
        `${baseUrl}/authentication/token/new?api_key=${api_key}`,
      );
      if (token.data.success) {
        var userValidation = await axios.post(
          `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=591239979ea5a03b35b3095c86d6555b&=09f2522b6ba75439a5740239f4588dd3e0842d16`,
          {
            username: userName,
            password: password,
            request_token: token.data.request_token,
          },
        ).catch((error)=> {
          console.log(error);
        })
        userValidation?.data.success
          ? (setloginError(false), navigation.navigate('Tab'))
          : setloginError(true);
      }
    }
  };
  return (
    <SafeAreaView>
      <Header />
      <View style={style.mainBody}>
        <Text style={style.heading}>Sign in</Text>
        <Text style={style.secondaryHeading}>
          Sign in to your Self Service Portal
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={style.usernameLabel}>Username</Text>
          <TextInput
            onChangeText={userid => {
              setuserName(userid);
            }}
            placeholder="Username"
            placeholderTextColor={'#4F6492'}
            style={style.textInput}
          />
          {userNameError && <Text style={style.errorText}>Enter userName</Text>}
          <Text style={style.passwordLabel}>Password</Text>
          <TextInput
            onChangeText={pass => {
              setpassword(pass);
            }}
            placeholder="Password"
            placeholderTextColor={'#4F6492'}
            style={style.textInput}
          />
          {passwordError && <Text style={style.errorText}>Enter password</Text>}
          {loginError && (
            <Text style={style.errorText}>Invalid userName or password</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              loginValidation();
            }}
            style={style.loginButton}>
            <Text style={style.loginButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainBody: {
    backgroundColor: '#0C111B',
    paddingLeft: 16,
    height: '94%',
    justifyContent: 'center',
    paddingRight: 16,
  },
  heading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
  },
  secondaryHeading: {
    color: '#fff',
    fontSize: 15,
    marginTop: 4,
  },
  usernameLabel: {
    color: '#fff',
    fontSize: 15,
  },
  passwordLabel: {
    color: '#fff',
    fontSize: 15,
    marginTop: 19,
  },
  textInput: {
    backgroundColor: '#182135',
    borderRadius: 8,
    marginTop: 10,
    paddingLeft: 15,
    color: '#fff',
  },
  errorText: {
    marginTop: 5,
    color: 'crimson',
  },
  loginButton: {
    backgroundColor: '#FF7D65',
    padding: 9,
    borderRadius: 16,
    marginTop: height / 24,
  },
  loginButtonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 17,
    letterSpacing: 3,
  },
});
export default Signin;
