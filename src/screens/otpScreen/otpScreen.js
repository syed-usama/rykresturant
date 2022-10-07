import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import color from '../../assets/colors/colors';
import styles from './otpScreen.style'
import style from '../../styles/global.style';
import { showToast } from '../../services/toast';



const OtpScreen = ({navigation,route}) => {
  const [isLoading , setLoading] = useState(false);
  const [otp , setOtp] = useState('');
    async function confirmCode() {
        if(otp >= 6){
          setLoading(true)
        try {
          await route.params.confirm.confirm(otp);
          //createuser();
          console.log('signedin')
          setLoading(false)
        } catch (error) {
          showToast("Invalid Code...")
          setLoading(false)
          //setotp("");
          console.log('error',error)
        }
    }else{
        showToast("OTP must be 6 digit")
    }
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
            <Text style={styles.text_header}>OTP !</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={styles.text_footer}>Enter Your OTP Code</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={color.white}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter OTP"
                    placeholderTextColor={color.white}
                    keyboardType='number-pad'
                    style={[styles.textInput, {
                        color: color.white
                    }]}
                    onChangeText={(val) => setOtp(val)}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=> confirmCode()}
                >
                <LinearGradient
                    colors={[color.white, color.white]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:color.secondary
                    }]}>Submit</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default OtpScreen;
