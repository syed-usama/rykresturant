import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../services/firebase/authProvider';
import styles from './wallet.style';
import colors from '../../assets/colors/colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { getAllOfCollectiondoublewhereIn } from '../../services/firebase/firebaseServices';
const Wallet = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading , setisLoading] = useState(true);
  const monthNames = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const renderDate = mdate => {
    // console.log('mdate',mdate)
    var date = new Date(mdate.seconds * 1000);
    // console.log('date',date)
    var day = date.getDate(); //To get the Current Date
    var month = date.getMonth() + 1; //To get the Current Month
    var year = date.getFullYear(); //To get the Current Year
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    let result = '';
    if (day == 1) {
      result = day + ' ' + monthNames[month] + ' ' + year + ' ' + strTime;
    } else if (day == 2) {
      result = day + ' ' + monthNames[month] + ' ' + year + ' ' + strTime;
    } else if (day == 3) {
      result = day + ' ' + monthNames[month] + ' ' + year + ' ' + strTime;
    } else {
      result = day + ' ' + monthNames[month] + ' ' + year + ' ' + strTime;
    }
    return result;
  };
  const renderOrder =({item,index}) =>{
    return(
      <View style={styles.row}>
      <MaterialIcons
        name="restaurant"
        size={25}
        color={colors.primary}
      />
      <View style={styles.detail}>
        <Text style={styles.title}>Credit</Text>
        <Text style={styles.textT4}>{item.order_id}</Text>
        <Text style={styles.date}>{renderDate(item.orderTime)}</Text>
      </View>
      <Text style={styles.textT5}>{item.order_amount-200}.00 PKR</Text>
    </View>
    );
  }
  useEffect(() => {
    // console.log(user);
    getOrders()
},[])
const getOrders=async () =>{
  const orders = await getAllOfCollectiondoublewhereIn('orders','res_id',user.res_id,'status',[2,3,4,5,6]);
  setOrders(orders)
  setisLoading(false);
  // console.log('orders',orders)
}
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
      <Text style={styles.textT2}> {user.balance}.34 PKR</Text>
      <View style={styles.divider}></View>
      <Text style={styles.textT3}>Recent Transactions</Text>
      {/* <View style={styles.row}>
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
      </View> */}
      {orders.length > 0 ?
      <View>
        <FlatList
        data={orders}
        style={{marginTop:0,height:heightPercentageToDP(90),}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOrder}
        />
      </View>
      :
      <View style={{flex:0.8,justifyContent:'center'}}>
        {isLoading ? 
        <ActivityIndicator color={colors.primary} size={40} style={{alignSelf:'center'}}/>
      :
          <Text style={styles.comingSoon}>You have no recent transaction</Text>
        }
       </View>
      }
{/*       
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
       */}
    </SafeAreaView>
  );
};

export default Wallet;
