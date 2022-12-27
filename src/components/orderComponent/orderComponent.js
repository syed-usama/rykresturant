import React, { useEffect, useState } from 'react';
import {View, Text,TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
import styles from './orderComponent.style';
const OrderComponent = ({orders,accept}) => {
  const [loader , setLoader] = useState(false);
  const monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const confirmAlert = (order) => {
    Alert.alert(
      "Are you sure",
      "Is order is handed over the rider ?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
          setLoader(true)
          accept(order)
        } }
      ]
    );
    }
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
    useEffect(()=>{
      setLoader(false);
    },[orders])
  return (
    <View style={styles.orderCard} key={orders.order_id}>
          <View style={styles.row1}>
          <Text style={styles.text1}>{renderDate(orders.orderTime)}</Text>
          <Text style={styles.text1}>#{orders.order_id}</Text>
          </View>
          {orders.products.map((product,index) =>
          <View key={index}>
            <Text style={styles.text2}>{product.pro_qty} x {product.pro_name}</Text>
            {product.pro_instructions ? <Text style={styles.text3}> {'~>'} ( User note : {product.pro_instructions})</Text>:null}
          </View>
          )}
          {accept ?
            <TouchableOpacity style={styles.button} onPress={()=> confirmAlert(orders)}>
            {loader ? 
              <ActivityIndicator color={'white'} size={20}/>
              :
              <Text style={styles.buttonText}>Dispatch</Text>
            }
            </TouchableOpacity>
            :null}
        </View>
  );
};

export default OrderComponent;

