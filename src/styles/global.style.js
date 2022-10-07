import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors/colors';
export default StyleSheet.create({
  loader: {
    zIndex: 100,
    position: 'absolute',
    height: hp('100%'), 
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeIconView:{
    position:'relative',
    height:34,
    width:34,
    borderRadius:17,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  badgeView:{
    backgroundColor: colors.primary,
    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'white',
    borderWidth:1,
    position:'absolute',
    right:-1,
    height:14,
    width:14,
    top:0
  },
  badge:{
    color:'#fff',
    fontSize:8,
  },
});