import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  BackHandler,
  Alert,
  StatusBar,
  Switch,
  Share,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './homeScreen.style';
import messaging from '@react-native-firebase/messaging';
import colors from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../services/firebase/authProvider';
import {
  getAllOfCollectiondoublewhere,
  getAllOfCollectionwhere,
  saveData,
} from '../../services/firebase/firebaseServices';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import HomeOrders from '../../components/homeOrders/homeOrders';
import {setData} from '../../services/AsyncStorageServices';
import {sendNotification} from '../../services/sendNotification';

const HomeScreen = ({navigation}) => {
  const [active, setActive] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [orders, setOrders] = useState([]);
  const {user, setUser} = useContext(AuthContext);
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
  const changeStatus = async status => {
    setLoader(true);
    const newUser = user;
    let date = new Date();
    newUser.active = status;
    newUser.updateDate = date;
    await saveData('resturants', user.r_id, {active: status, updateDate: date});
    await setData('user', newUser);
    setUser(newUser);
    setActive(status);
    await getOrders();
    setLoader(false);
  };

  const accept = async order => {
    // console.log('order Detail>>',order)
    TrackPlayer.reset();
    await saveData('orders', order.order_id, {status: 1});
    await getOrders();
    let activeRiders = await getAllOfCollectionwhere('riders', 'active', true);
    console.log('rides', activeRiders);
    if (activeRiders.length > 0) {
      activeRiders.forEach(rider => {
        if (rider.token && rider.balance < 3000) {
          sendNotification(
            rider.token,
            user.r_id,
            'New order',
            'Open app for more detail',
            'new order',
          );
        }
      });
    }
  };
  const reject = async order => {
    // console.log('order Detail>>',order)
    const data = order;
    data.status = 9;
    TrackPlayer.reset();
    await saveData('orders', order.order_id, {status: 9});
    await getOrders();
  };
  const renderOrder = ({item, index}) => {
    return (
      <HomeOrders order={item} accept={accept} reject={reject} key={item} />
    );
  };
  useEffect(() => {
    console.log('Home Screen..');
    setActive(user.active);
    // PushController(user.phoneNumber)
    getOrders();
  }, []);
  messaging().onMessage(async remoteMessage => {
    console.log('homeMessage >>>', remoteMessage);
    getOrders();
  });
  const getOrders = async () => {
    setisLoading(true);
    const orders = await getAllOfCollectiondoublewhere(
      'orders',
      'res_id',
      user.res_id,
      'status',
      0,
    );
    setOrders(orders);
    setisLoading(false);
    // console.log('orders',orders)
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={colors.primary} />
      {loader ? (
        <ActivityIndicator
          color={colors.primary}
          size={30}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: 90,
            zIndex: 999,
          }}
        />
      ) : null}
      <View style={styles.header}>
        <FontAwesome
          name="bars"
          size={27}
          color={colors.primary}
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.titleText}>Dashboard</Text>
        <Switch
          thumbColor={active ? 'green' : 'grey'}
          color
          value={active}
          onValueChange={value => changeStatus(value)}
        />
      </View>
      <View style={styles.statusRow}>
        <Text
          style={[styles.status, {color: active ? colors.green : colors.grey}]}>
          {active ? '⬤ Open' : '⬤ Closed'}
        </Text>
        <TouchableOpacity
            onPress={()=> {
              try {
                TrackPlayer.reset()
              }catch{
                console.log('no track player')
              }
              }}>
        <Ionicons
          name="volume-mute"
          size={30}
          color={colors.primary}
        />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Dashboard</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('Deliveries');
          }}
          style={styles.card}>
          <MaterialIcons name="restaurant" size={27} color={colors.white} />
          <Text style={styles.cardTitle}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}
          style={styles.card}>
          <Ionicons name="wallet" size={27} color={colors.white} />
          <Text style={styles.cardTitle}>Wallet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('History');
          }}
          style={styles.card}>
          <MaterialCommunityIcons
            name="history"
            size={27}
            color={colors.white}
          />
          <Text style={styles.cardTitle}>Recent Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onShare()} style={styles.card}>
          <Foundation name="social-myspace" size={27} color={colors.white} />
          <Text style={styles.cardTitle}>Refer a friend</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.heading}>Upcoming Orders</Text>
        <FontAwesome
          name="refresh"
          size={20}
          color={colors.primary}
          onPress={() => getOrders()}
          style={{marginTop: 23, marginLeft: 20}}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          color={colors.primary}
          size={30}
          style={{marginTop: 80}}
        />
      ) : (
        <>
          {orders.length > 0 ? (
            <View>
              <FlatList
                data={orders}
                style={{marginTop: 0, height: heightPercentageToDP(34)}}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderOrder}
              />
            </View>
          ) : (
            <Text style={styles.text}>No upcoming orders...</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
