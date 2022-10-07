import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
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
      },
      row:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        height:50,
        elevation:10
      },
      dateText:{
        fontSize:18,
        fontWeight:'600',
        color:colors.primary,
        marginRight:5,
      },
      titleText: {
        fontSize: 20,
        fontWeight:'700',
        color:colors.secondary,
      },
      textT1:{
        marginTop:10,
        textAlign:'center',
        fontSize:13,
        color: colors.black,
        fontFamily:Fonts.Axiforma
      },
      textT2:{
        marginTop:10,
        textAlign:'center',
        fontSize:14,
        color: colors.black,
        fontWeight:'800'
      },
      comingSoon:{
          textAlign:'center',
          fontSize:19,
          color: colors.black,
          fontWeight:'500'
      },
      back:{
        marginTop:20,
        textAlign:'center',
        fontSize:14,
        color: colors.grey,
        fontFamily:Fonts.Axiforma
    }

});
