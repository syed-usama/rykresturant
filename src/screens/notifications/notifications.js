import React, { useContext, useEffect } from 'react';
import {View, Text, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../services/firebase/authProvider';
import styles from './notifications.style';
import colors from '../../assets/colors/colors';
const Notifications = ({navigation}) => {
    const {user} = useContext(AuthContext);
    useEffect(() => {
        console.log(user);
    },[])
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
          <Text style={styles.titleText}>Notifications</Text>
          <Text style={styles.titleText}></Text>
      </View>
      <View style={{flex:0.8,justifyContent:'center'}}>
          <Text style={styles.comingSoon}>You have currently no notifications</Text>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Text style={styles.back}>{'Go back'}</Text>
          </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
};

export default Notifications;

