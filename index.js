/**
 * @format
 */
 import React from 'react';
 import { NativeBaseProvider } from 'native-base';
import {Alert, AppRegistry,Share} from 'react-native';
import App from './src/navigation/main';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import SoundPlayer from 'react-native-sound-player'
import { PlaybackService } from './src/services/playbackservice';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => PlaybackService);
const setup = async () => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.add({
    url: require('./src/assets/bell.mp3'),
    title: 'Track Title',
    artist: 'Track Artist',
  });
  TrackPlayer.setRepeatMode(RepeatMode.Queue);
//   TrackPlayer.updateOptions({
//     android: {
//         appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
//     },
// });
};
messaging().onMessage(async(remoteMessage) =>{
  TrackPlayer.play()
});
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
 await setup();
  console.log('Message handled in the background!', remoteMessage);
  TrackPlayer.play()
});
const Main = () => {
  setup();
    return (
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    );
  };
AppRegistry.registerComponent(appName, () => Main);


