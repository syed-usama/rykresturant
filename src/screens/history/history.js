import React, { useContext, useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../services/firebase/authProvider';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './history.style';
import colors from '../../assets/colors/colors';
const History = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date ,setDate] = useState('Aug 2022');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "December"
];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    hideDatePicker();
    const selDate = new Date(date)
    let seleDate = date.getDate()+' '+monthNames[date.getMonth()]+' '+date.getFullYear();
    // console.log('date',selDate)
    setDate(seleDate)
  };
    useEffect(() => {
        //console.log(user);
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
          <Text style={styles.titleText}>Recent Orders</Text>
          <Text style={styles.titleText}></Text>
      </View>
      <TouchableOpacity 
      onPress={()=> showDatePicker()}
      style={styles.row}>
        <Text style={styles.dateText}>{date}</Text>
        <Icon
            name="chevron-down"
            size={16}
            color={colors.primary}
          />
      </TouchableOpacity>
      <Text style={styles.textT1}>Orders</Text>
      <Icon
            name="shopping-bag"
            size={16}
            color={colors.black}
            style={{alignSelf:'center',marginTop:4}}
          />
          <Text style={styles.textT2}>0</Text>
      <View style={{flex:0.8,justifyContent:'center'}}>
          <Text style={styles.comingSoon}>There's no recent orders</Text>
          <Text style={styles.back}>Check other dates to see recent orders</Text>
          </View>
          <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default History;

