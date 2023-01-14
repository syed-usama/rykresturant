import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  header: {
    marginTop: 30,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.secondary,
  },
  logo: {
    marginTop: 30,
    alignSelf: 'center',
    height: 70,
    width: 180,
  },
  body: {
    paddingHorizontal: 40,
  },
  bodyText1: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  text1:{
    marginTop: 30,
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  text2:{
    marginLeft:10,
    marginTop: 10,
    fontSize: 15,
    fontWeight: '400',
    color: colors.secondary,
  }
});
