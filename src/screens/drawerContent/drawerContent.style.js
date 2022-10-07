import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
export default StyleSheet.create({
    drawerContent: {
        flex: 1,
        marginTop: 25,
      },
      userInfoSection: {
          flex: 1,
        paddingLeft: 20,
        backgroundColor: colors.primary,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: colors.white
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        marginBottom:10,
        color: colors.white
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
          flex: 2,
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
});
