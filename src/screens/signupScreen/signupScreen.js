import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from './signupScreen.style';
import style from '../../styles/global.style';
import color from '../../assets/colors/colors';
import {AuthContext} from '../../services/firebase/authProvider';
import colors from '../../assets/colors/colors';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({navigation}) => {
  const {user, login, register, logout} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidPassword: false,
  });

  const textInputChange = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const changeLoader = () => {
    setLoading(false);
  };
  const validate = () =>{
    let newemail = data.email.toLowerCase();
    firestore()
    .collection('users')
    // Filter results
    .where('email', '==', newemail)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size == '0') {
        proceed();
      } else {
        ToastAndroid.show('Email is already registered', ToastAndroid.SHORT);
        setLoading(false);
      }
    }).catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }
  const proceed =()=>{
    let newemail = data.email.toLowerCase();
    firestore()
    .collection('users')
    .add({
      email : newemail,
      password : data.password
    })
    .then(() => {
      register(newemail, data.password, changeLoader);
    })
    .catch(error => {
      console.log('error', error);
      setLoading(false);
    });
  }
  const signUp = () => {
    if (data.password == data.confirm_password && data.password.length >= 8) {
      if (data.check_textInputChange) {
        setLoading(true);
        validate();
      } else {
        ToastAndroid.show('Enter a Valid Email Address', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Enter a Valid Password', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={style.loader}>
          <ActivityIndicator size={50} color={colors.white} />
        </View>
      ) : null}
      <StatusBar backgroundColor={color.primary} barStyle="light-content" />
      <View style={styles.header}>
      <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/images/rykmall.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={color.white} size={20} />
            <TextInput
              placeholder="Your Email Address"
              placeholderTextColor={color.white}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color={color.white} size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={color.white} size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor={color.white}
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color={color.white} size={20} />
              ) : (
                <Feather name="eye" color={color.white} size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={color.white} size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              placeholderTextColor={color.white}
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color={color.white} size={20} />
              ) : (
                <Feather name="eye" color={color.white} size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                signUp();
              }}>
              <LinearGradient
                colors={[color.white, color.white]}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: color.secondary,
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: color.white,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: color.white,
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignupScreen;
