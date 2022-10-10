import React, { useEffect, useState } from 'react';
import {View, Text,TouchableOpacity,ActivityIndicator,} from 'react-native';
import styles from './homeOrders.style';
const HomeOrders = ({order,accept,reject}) => {
  const [loader , setLoader] = useState(false)
  const [loader1 , setLoader1] = useState(false)
  const monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
useEffect(()=>{
  setLoader(false);
  setLoader1(false)
},[order])
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
  return (
    <View style={styles.orderCard} key={order.order_id}>
        <View style={styles.row1}>
        <Text style={styles.text1}>{renderDate(order.orderTime)}</Text>
        <Text style={styles.text1}>#{order.order_id}</Text>
        </View>
        {order.products.map((product,index) =>
        <View key={index}>
          <Text style={styles.text2}>{product.pro_qty} x {product.pro_name}</Text>
        </View>
        )}
        <Text style={styles.text3}>User note : {order.user_note}</Text>
        <View style={styles.row1}>
          <TouchableOpacity style={styles.button} onPress={()=> {
            setLoader(true)
            reject(order)
            }}>
            {loader ? 
            <ActivityIndicator color={'white'} size={20}/>
            :
            <Text style={styles.buttonText}>Reject</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'green'}]} onPress={()=> {
            setLoader1(true);
            accept(order)
            }}>
          {loader1 ? 
            <ActivityIndicator color={'white'} size={20}/>
            :
            <Text style={styles.buttonText}>Accept</Text>
          }
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default HomeOrders;

