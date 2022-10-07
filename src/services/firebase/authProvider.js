import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';

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
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
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
