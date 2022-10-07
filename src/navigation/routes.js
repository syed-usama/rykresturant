import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../services/firebase/authProvider';
import React, {useContext, useState, useEffect} from 'react';
import { DrawerStack, OnBoardStackNavigator } from './stackNavigator';
import { Provider as StoreProvider } from 'react-redux';
import store from '../services/redux/store/store';
import DrawerNavigator from './drawerNavigator';
import HomeScreen from '../screens/homeScreen/homeScreen';
const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      {!user ? 
        <OnBoardStackNavigator />
       : 
       <DrawerStack/>
      }
    </NavigationContainer>
  );
};
export default Routes;
