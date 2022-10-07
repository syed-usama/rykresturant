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
    }

});
