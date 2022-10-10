import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Fonts from '../../global/constants';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.offwhite,
      },
      header:{
        marginTop:30,
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'space-between'
      },
      titleText: {
        fontSize: 20,
        fontWeight:'700',
        color:colors.secondary,
      },
      comingSoon:{
          textAlign:'center',
          fontSize:17,
          color: colors.black,
          fontFamily:Fonts.Axiforma
      },
      back:{
        marginTop:20,
        textAlign:'center',
        fontSize:16,
        color: colors.primary,
        fontFamily:Fonts.Axiforma
    },
    orderCard:{
      paddingHorizontal:15,
      marginHorizontal:10,
      paddingTop:5,
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
      marginVertical:15,
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
