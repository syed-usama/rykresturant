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
        justifyContent:'space-between',
        elevation:5
      },
      titleText: {
        fontSize: 20,
        fontWeight:'700',
        color:colors.secondary
      },
      status:{
        fontSize:18,
        color:'white',
        fontWeight:'600',
        width:wp(100),
        height:40,
        textAlignVertical:'center',
        paddingLeft:20,
        marginTop:1,
        elevation:10,
        backgroundColor:colors.lightGrey
      },
      row:{
        marginVertical:10,
        flexDirection:'row',
        width:wp(100),
        justifyContent:'space-between',
        paddingHorizontal:wp(5)
      },
card:{
  backgroundColor:colors.primary,
  height:hp(15),
  width:wp(42),
  borderRadius:15,
  justifyContent:'center',
  alignItems:'center'
},
cardTitle:{
  marginTop:5,
  fontSize:17,
  color:'white',
  fontFamily:Fonts.MonSemiBold,
},
heading:{
  marginTop:20,
  marginBottom:10,
  fontSize:20,
  color:'black',
  fontFamily:Fonts.MonSemiBold,
  marginLeft:20,
},
text:{
  fontSize:16,
  color:colors.primary,
  fontFamily:Fonts.MonRegular,
  textAlign:'center',
  marginTop: 100,
},
orderCard:{
  paddingHorizontal:15,
  marginHorizontal:10,
  paddingVertical:15,
  marginVertical:8,
  borderRadius:10,
  backgroundColor:'white'
},
row1:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginBottom:10,
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
}
});
