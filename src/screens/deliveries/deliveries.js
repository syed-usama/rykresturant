import React, { useContext, useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../services/firebase/authProvider';
import styles from './deliveries.style';
import colors from '../../assets/colors/colors';
import { getAllOfCollectiondoublewhere, getAllOfCollectiondoublewhereIn, saveData } from '../../services/firebase/firebaseServices';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import OrderComponent from '../../components/orderComponent/orderComponent';
const Deliveries = ({navigation}) => {
    const {user,updateUser} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [isLoading , setisLoading] = useState(true);
    const accept = async(order)=>{
      // console.log('order Detail>>',order)
      // var newbalance = user.balance+order.order_amount;
      // newbalance = newbalance;
      await saveData('orders',order.order_id,{status:3})
      // await saveData('resturants',user.r_id,{balance:newbalance})
      await updateUser(user.r_id);
      await getOrders();
    }
    const renderOrder =({item,index}) =>{
      return(
        <OrderComponent orders={item} accept={accept} key={item.order_id} />
      );
    }
    useEffect(() => {
        //console.log(user);
        getOrders()
    },[])
    const getOrders=async () =>{
      const orders = await getAllOfCollectiondoublewhereIn('orders','res_id',user.res_id,'status',[1,2]);
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
          <Text style={styles.titleText}>Orders</Text>
          <Text style={styles.titleText}></Text>
      </View>
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
          <Text style={styles.comingSoon}>You have no pending orders</Text>
        }
          <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Text style={styles.back}>{'Go back'}</Text>
          </TouchableOpacity>
       </View>
      }
    </SafeAreaView>
  );
};

export default Deliveries;

