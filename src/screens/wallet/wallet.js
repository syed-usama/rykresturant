import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../services/firebase/authProvider';
import styles from './wallet.style';
import colors from '../../assets/colors/colors';
const Wallet = ({navigation}) => {
  const {user} = useContext(AuthContext);
  useEffect(() => {
    //console.log(user);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={colors.primary} />
      <View style={styles.header}>
        <Icon
          name="chevron-left"
          size={25}
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.titleText}>Wallet</Text>
        <Text style={styles.titleText}></Text>
      </View>
      <Text style={styles.textT1}>Current balance</Text>
      <Text style={styles.textT2}> 947.34 PKR</Text>
      <View style={styles.divider}></View>
      <Text style={styles.textT3}>Recent Transactions</Text>
      <View style={styles.row}>
        <Feather
          name="share"
          size={25}
          color={colors.primary}
        />
        <View style={styles.detail}>
          <Text style={styles.title}>Withdrawl</Text>
          <Text style={styles.textT4}>HBL Pvt</Text>
          <Text style={styles.date}>05 Aug</Text>
        </View>
        <Text style={styles.textT5}>920.00 PKR</Text>
      </View>
      <View style={styles.row}>
        <Feather
          name="share"
          size={25}
          color={colors.primary}
        />
        <View style={styles.detail}>
          <Text style={styles.title}>Withdrawl</Text>
          <Text style={styles.textT4}>HBL Pvt</Text>
          <Text style={styles.date}>04 Aug</Text>
        </View>
        <Text style={styles.textT5}>600.00 PKR</Text>
      </View>
      <View style={styles.row}>
      <MaterialIcons
          name="restaurant"
          size={25}
          color={colors.primary}
        />
        <View style={styles.detail}>
          <Text style={styles.title}>Credit</Text>
          <Text style={styles.textT4}>cd564Xsd98</Text>
          <Text style={styles.date}>03 Aug</Text>
        </View>
        <Text style={styles.textT5}>200.00 PKR</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons
          name="restaurant"
          size={25}
          color={colors.primary}
        />
        <View style={styles.detail}>
          <Text style={styles.title}>Credit</Text>
          <Text style={styles.textT4}>jd567XXs5</Text>
          <Text style={styles.date}>03 Aug</Text>
        </View>
        <Text style={styles.textT5}>480.00 PKR</Text>
      </View>
      <View style={styles.row}>
        <Feather
          name="share"
          size={25}
          color={colors.primary}
        />
        <View style={styles.detail}>
          <Text style={styles.title}>Withdrawl</Text>
          <Text style={styles.textT4}>HBL Pvt</Text>
          <Text style={styles.date}>01 Aug</Text>
        </View>
        <Text style={styles.textT5}>920.00 PKR</Text>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
