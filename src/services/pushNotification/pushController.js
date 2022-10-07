import messaging from '@react-native-firebase/messaging';
import firestore from "@react-native-firebase/firestore";
import { Alert } from 'react-native';

export const PushController = async (phone) => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    function onMessageReceived(message) {
      // notifee.displayNotification(JSON.parse(message.data.notifee));
      Alert.alert('Success','This is success')
      console.log('success')
    }
  if (enabled) {
    messaging().getToken().then((token) => {
      console.log('Authorization status:', token);
      firestore()
        .collection('resturants')
        // Filter results 
        .where('res_phone', '==', phone)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((documentSnapshot) => {
            let id = documentSnapshot.id;
            firestore()
              .collection("resturants")
              .doc(id)
              .update({
                token: token,
              })
              .then(() => {
                console.log("token updated!");
              })
              .catch((error) => {
                console.log("error", error);
              });
          });
        });
      // console.log("TOKEN:", token.token);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:',remoteMessage.notification,remoteMessage.data);
          //navigation.navigate(remoteMessage.data.type);
        }
      });
      // messaging().onMessage(onMessageReceived);
      // messaging().setBackgroundMessageHandler(onMessageReceived);      
  }
};
