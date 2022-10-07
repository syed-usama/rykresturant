import React, {useEffect,useContext, useState}from 'react';
import {View, Text, SafeAreaView, ImageBackground,BackHandler,Alert, StatusBar, Switch, Share, FlatList, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './homeScreen.style';
import HomeSwiper from '../../components/homeSwiper/homeSwiper';
import colors from '../../assets/colors/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PushController } from '../../services/pushNotification/pushController';
import { AuthContext } from '../../services/firebase/authProvider';
import { getAllOfCollectionwhere } from '../../services/firebase/firebaseServices';
import SoundPlayer from 'react-native-sound-player';
import  TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { heightPercentageToDP } from 'react-native-responsive-screen';


const HomeScreen = ({navigation}) => {
  const [active , setActive] = useState(false)
  const [orders , setOrders] = useState([])
  const {user} = useContext(AuthContext);
  const monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi , Download now Ryk Mall From Play Store and enjoy unlimitid discounts on on resturants and stores.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const renderDate =(mdate)=>{
    // console.log('mdate',mdate)
    var date = new Date(mdate.seconds*1000);
    // console.log('date',date)
    var day = date.getDate(); //To get the Current Date
    var month = date.getMonth() + 1; //To get the Current Month
    var year = date.getFullYear(); //To get the Current Year
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    let result = '';
    if (day == 1){
      result = day + "st of " + monthNames[month] + " "+year+" "+strTime;
    }else if(day == 2){
      result = day + "nd of " + monthNames[month] + " "+year+" "+strTime;
    }else if(day == 3){
      result = day + "rd of " + monthNames[month] + " "+year+" "+strTime;
    }else{
      result = day + "th of " + monthNames[month] + " "+year+" "+strTime;
    }
    return result;
  }
  const setup = async () => {
    await TrackPlayer.setupPlayer({});
  
    await TrackPlayer.add({
      url: require('../../assets/bell.mp3'),
      title: 'Track Title',
      artist: 'Track Artist',
    });
  
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
    TrackPlayer.setVolume(1)
  };
  const renderOrder =({item,index}) =>{
    return(
      <View style={styles.orderCard} key={index}>
        <View style={styles.row1}>
        <Text style={styles.text1}>{renderDate(item.orderTime)}</Text>
        <Text style={styles.text1}>#{item.order_id}</Text>
        </View>
        {item.products.map((product) =>
        <View>
          <Text style={styles.text2}>{product.pro_qty} x {product.pro_name}</Text>
        </View>
        )}
      </View>
    );
  }
  useEffect(()=>{
  console.log('Home Screen..')
  
  PushController(user.phoneNumber)
  getOrders()
  },[])
  const getOrders=async () =>{
    const orders = await getAllOfCollectionwhere('orders','res_id','3');
    setOrders(orders)
    // console.log('orders',orders)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={colors.primary} />
      <View style={styles.header}>
          <FontAwesome
            name="bars"
            size={27}
            color={colors.primary}
            onPress={() => navigation.openDrawer()}
          />
          <Text style={styles.titleText}>Dashboard</Text>
          <Switch thumbColor={active ? 'green' : 'grey'} color value={active} onValueChange={(value)=> setActive(value)}/>
      </View>
          <Text style={[styles.status,{color: active ? colors.green : colors.grey}]}>
            {active ? '⬤ Open' : '⬤ Closed'}
          </Text>
          <Text style={styles.heading}>Dashboard</Text>
          <View style={styles.row}>
            <TouchableOpacity
            onPress={()=> {
              // navigation.navigate('Deliveries')
              TrackPlayer.play()
              // setup();
            }}
             style={styles.card}>
            <MaterialIcons
            name="restaurant"
            size={27}
            color={colors.white}
          />
              <Text style={styles.cardTitle}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate('Wallet')}
             style={styles.card}>
            <Ionicons
            name="wallet"
            size={27} 
            color={colors.white}
          />
              <Text style={styles.cardTitle}>Wallet</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <TouchableOpacity
            onPress={()=> {
              // navigation.navigate('History')
              TrackPlayer.pause();
            }}
             style={styles.card}>
            <MaterialCommunityIcons
            name="history"
            size={27}
            color={colors.white}
          />
              <Text style={styles.cardTitle}>Recent Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> onShare()}
             style={styles.card}>
            <Foundation
            name="social-myspace"
            size={27}
            color={colors.white}
          />
              <Text style={styles.cardTitle}>Refer a friend</Text>
            </TouchableOpacity>
          </View>
      <Text style={styles.heading}>Upcoming Orders</Text>

      {orders.length > 0 ?
      <View>
        <FlatList
        data={orders}
        style={{marginTop:0,height:heightPercentageToDP(35),}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOrder}
        />
      </View>
      :
      <Text style={styles.text}>No upcoming orders...</Text>
        }
    </SafeAreaView>
  );
};

export default HomeScreen;

