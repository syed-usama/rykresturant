import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider } from '../services/firebase/authProvider';
import Routes from './routes';

const Main = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Main;