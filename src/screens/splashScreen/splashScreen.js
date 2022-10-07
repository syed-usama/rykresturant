import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import color from '../../assets/colors/colors';
import styles from './splashScreen.style';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={color.primary} barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/images/rykres.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: color.primary
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: color.white
            }]}>Stay connected with Us!</Text>
            <Text style={styles.text}>Sign in with your account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
                <LinearGradient
                    colors={[color.secondary, color.secondary]}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;
