import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../global/constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offwhite,
  },
  header: {
    marginTop: 30,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.secondary,
  },
  comingSoon: {
    textAlign: 'center',
    fontSize: 17,
    color: colors.black,
    fontFamily: Fonts.Axiforma,
  },
  back: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: colors.primary,
    fontFamily: Fonts.Axiforma,
  },
  textT1: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    fontWeight:'400',
    color: 'black',
  },
  textT2: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: Fonts.Integral_Regular,
    color: 'black',
  },
  divider: {
    marginTop: 15,
    borderColor:'grey',
    borderBottomWidth: 0.3,
    width: wp(100),
  },
  textT3: {
    marginTop: 20,
    fontSize: 19,
    marginLeft:20,
    fontWeight:'600',
    color: 'black',
  },
  row: {
    marginTop: 20,
    marginBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  detail: {
    width:wp(43),
  },
  title: {
    fontSize: 17,
    fontWeight:'700',
    color: 'black',
  },
  textT4: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: Fonts.MonMedium,
    color: 'black',
  },
  date: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: Fonts.MonRegular,
    color: 'black',
  },
  textT5: {
    fontSize: 18,
    fontWeight:'700',
    color: 'black',
  },
});
