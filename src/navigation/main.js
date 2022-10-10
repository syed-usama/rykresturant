import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { AuthProvider } from '../services/firebase/authProvider';
import Routes from './routes';
// import TrackPlayer from 'react-native-track-player';

const Main = () => {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Main;