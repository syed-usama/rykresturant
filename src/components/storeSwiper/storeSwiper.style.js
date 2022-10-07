import {StyleSheet,Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default StyleSheet.create({
    swiper:{
        marginTop:20,
        marginHorizontal:10,
    },
    sliderImage:{
        width:wp(95),
        height:hp(23),
        resizeMode:'stretch',
        borderRadius:10
    }
});
