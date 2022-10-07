import React from 'react';
import {View, Image} from 'react-native';
import Swiper from 'react-native-swiper'
import colors from '../../assets/colors/colors';
import styles from './storeSwiper.style';
const StoreSwiper = ({navigation}) => {
  return (
    <Swiper style={styles.swiper} dotColor={colors.white} activeDotColor={colors.primary} autoplay={true}>

      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/slider_images/storeSlider1.jpeg')}/>
      </View>

      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/slider_images/slide2.jpeg')}/>
      </View>
      <View style={styles.slide}>
        <Image style={styles.sliderImage} source={require('../../assets/images/storeSlider2.jpeg')}/>
      </View>
    </Swiper>
  );
};

export default StoreSwiper;

