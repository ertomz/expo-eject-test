import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import TrackPlayer from "react-native-track-player"

AppRegistry.registerComponent(appName, () => App);

// Register playback service as soon as app is mounted
TrackPlayer.registerPlaybackService(() => require("./service.js"));