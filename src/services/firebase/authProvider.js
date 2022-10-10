import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { Clear, setData } from '../AsyncStorageServices';
import { getAllOfCollectionwhere, saveData } from './firebaseServices';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password,changeLoader) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            changeLoader();
          } catch (e) {
            if (Platform.OS === 'android') {
              ToastAndroid.show("Incorrect Email or Password", ToastAndroid.SHORT);
            } else {
              AlertIOS.alert("Incorrect Email or Password");
            }
            changeLoader();
          }
        },
        register: async (email, password,changeLoader) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
            changeLoader();
          } catch (e) {
            ToastAndroid.show("Something went wrong with sign up", ToastAndroid.SHORT);
            changeLoader();
          }
        },
        updateUser: async (r_id) => {
          try {
            const newuser = await getAllOfCollectionwhere('resturants', 'r_id',r_id )
            if(newuser.length > 0)
            { 
              setUser(newuser[0]);
              await setData('user',newuser[0])
            }
          } catch (e) {
            ToastAndroid.show("Something went wrong with updating user", ToastAndroid.SHORT);
          }
        },
        logout: async () => {
          await saveData('resturants',user.r_id,{token:'',active:false})
          await Clear('user');
          setUser('')
        },
        passwordReset: async (email ) => {
          return await auth().sendPasswordResetEmail(email).then(() =>{
          })
          .catch(error => {
            console.log('Error >', error)
          });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
