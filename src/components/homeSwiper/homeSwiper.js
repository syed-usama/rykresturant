import React from 'react';
import {View, Image} from 'react-native';
import Swiper from 'react-native-swiper'
import colors from '../../assets/colors/colors';
import styles from './homeSwiper.style';
const HomeSwiper = ({navigation}) => {
  return (
    <Swiper style={styles.swiper} dotColor={colors.white} activeDotColor={colors.primary} autoplay={true}>
      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/slider_images/slide1.jpeg')}/>
      </View>
      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/slider_images/slide2.jpeg')}/>
      </View>
      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/slider_images/slide5.jpg')}/>
      </View>
      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/slider_images/slide3.jpeg')}/>
      </View>
      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/slider_images/slide4.jpeg')}/>
      </View>
    </Swiper>
  );
};

export default HomeSwiper;

