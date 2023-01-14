/**
 * @format
 */
 import React from 'react';
 import { NativeBaseProvider } from 'native-base';
import { AppRegistry} from 'react-native';
import App from './src/navigation/main';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { PlaybackService } from './src/services/playbackservice';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => PlaybackService);
const setup = async () => {
  try{
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add({
      url: require('./src/assets/bell.mp3'),
      title: 'Track Title',
      artist: 'Track Artist',
    });
    
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
    TrackPlayer.play()
  }catch(e){
    await TrackPlayer.add({
      url: require('./src/assets/bell.mp3'),
      title: 'Track Title',
      artist: 'Track Artist',
    });
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
    TrackPlayer.play()
  }
};
messaging().onMessage(async(remoteMessage) =>{
 await setup();
 console.log('onmessage!', remoteMessage);
});
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
 await setup();
  console.log('Message handled in the background!', remoteMessage);
});
const Main = () => {
    return (
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    );
  };
AppRegistry.registerComponent(appName, () => Main);


