import {StyleSheet,Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import Fonts from '../../global/constants';
export default StyleSheet.create({
    orderCard:{
        paddingHorizontal:15,
        marginHorizontal:10,
        paddingTop:10,
        paddingBottom:15,
        marginVertical:8,
        borderRadius:10,
        backgroundColor:'white'
      },
      row1:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:10,
      },
      text1:{
        fontSize:10,
        color:colors.black,
        fontFamily:Fonts.MonSemiBold,
      },
      text2:{
        marginTop:3,
        fontSize:15,
        color:colors.black,
        fontFamily:Fonts.MonSemiBold,
      },
      text3:{
        marginTop:3,
        fontSize:14,
        color:colors.grey,
        fontFamily:Fonts.MonMedium,
      },
      button:{
        marginTop:15,
        alignSelf:'center',
        backgroundColor:colors.primary,
        height:hp(4),
        width:wp(80),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
      },
      buttonText:{
        fontSize:14,
        color:colors.white,
        fontFamily:Fonts.MonSemiBold,
      },
});
