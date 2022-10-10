import React, { useContext,useState, useRef } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StatusBar,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput from 'react-native-phone-number-input';
import color from '../../assets/colors/colors';
import auth from '@react-native-firebase/auth';
import styles from './loginScreen.style'
import style from '../../styles/global.style';
import { AuthContext } from '../../services/firebase/authProvider';
import { colors } from 'react-native-elements';
import { getAllOfCollectionwhere } from '../../services/firebase/firebaseServices';
import axios from 'axios';
import { showToast } from '../../services/toast';



const LoginScreen = ({navigation}) => {
    const phoneInput = useRef(null);
  const {user, login, register, logout} = useContext(AuthContext);
  const [isLoading , setLoading] = useState(false);
    const [data, setData] = React.useState({
        phoneNumber: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [confirm, setConfirm] = useState('');

    async function signInWithPhoneNumber() {
        if(data.isValidUser && data.check_textInputChange){
        setLoading(true)
        const phone = data.phoneNumber;
        let confirmation;
        try {
          confirmation = await auth().signInWithPhoneNumber(phone);
          console
          setConfirm(confirmation);
            navigation.navigate('OtpScreen',{confirm:confirmation});
            setLoading(false);
        } catch (e) {
          console.log("error >>" ,e);
          setLoading(false);
        }   
    }
    }
      const getUser = async() =>{

        if(data.isValidUser && data.check_textInputChange){
            setLoading(true)
        // const phone = data.phoneNumber;
        let phone = data.phoneNumber.replace("+920", "+92");
        let user_data = await getAllOfCollectionwhere('resturants','res_phone',phone)
        console.log('data>>>',user_data)
        if(user_data.length > 0){
            sendCode(user_data)
        }else{
            showToast('Invalid User')
            setLoading(false)
        }
        }
      }
      const sendCode =(userDetail) => {
        if(data.isValidUser && data.check_textInputChange){
        // const phone = data.phoneNumber;
        let phone = data.phoneNumber.replace("+920", "+92");
          let confirmation = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
          setConfirm(confirmation);
          console.log("confirmation =", confirmation);
          let url = "https://otp-verify-ejd76ds5ka-ue.a.run.app/send-otp/"+phone+"/" +confirmation;
          axios.post(url)
            .then(async response => {
              console.log("otp code Sent", response.data);
              if(response.data.status){
                navigation.navigate('OtpScreen',{confirm:confirmation,userDetail:userDetail});
              }
              setLoading(false);
            })
            .catch((err) => {
              console.log("error", err);
              setLoading(false);
            });
        }
        }
    const textInputChange = (val) => {
        if(val.length >= 13) {
            setData({
                ...data,
                phoneNumber: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                phoneNumber: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const changeLoader = () => {
      setLoading(false);
    };
    const signIn =() => {
        // navigation.navigate('OtpScreen')
    //   let newemail = data.username.toLowerCase();
    //   if(data.isValidUser && data.isValidPassword && data.check_textInputChange){
    //     setLoading(true);
    //     login(newemail,data.password,changeLoader)
    //   }else{
    //     ToastAndroid.show('Enter a Valid Email and Password', ToastAndroid.SHORT);
    //   }
    }



    return (
      <View style={styles.container}>
        {isLoading ? (
        <View style={style.loader}>
          <ActivityIndicator size={50} color={color.white} />
        </View>
      ) : null}
          <StatusBar backgroundColor={color.primary} barStyle="light-content"/>
        <View style={styles.header}>
        <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/images/rykres.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={[styles.text_footer]}>Phone Number</Text>
            <View style={styles.action}>
                <PhoneInput
                ref={phoneInput}
                color={'#FFFFFF'}
                defaultCode="PK"
                withShadow
                placeholder="Phone Number"
                placeholderTextColor={'#FFFFFF'}
                containerStyle={styles.phoneInput}
                textInputStyle={styles.textInputStyle}
                textContainerStyle={styles.textContainer}
                onChangeFormattedText={value => {
                  textInputChange(value);
                }}
              />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                    style={{marginTop:10}}
                        name="check-circle"
                        color={color.white}
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Enter a valid Phone Number.</Text>
            </Animatable.View>
            }
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=> getUser()}
                >
                <LinearGradient
                    colors={[color.white, color.white]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:color.secondary
                    }]}>Get OTP</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default LoginScreen;
