import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Audio, Video } from 'expo-av';

import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

const tracks = [
  {
  id: '12345',
  url: require('./assets/RedLights.mp3'),
  title: 'Red Lights',
  artist: 'Corky Tomz',
  // artwork: require('./assets/Corky.png'),
  },
];

const App = () => {

  const [sound, setSound] = useState(null);

  useEffect(() => {
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ],
    });
    setUpTrackPlayer();   
    console.log('setup');
    return () => TrackPlayer.destroy();
  }, []);

  async function setUpTrackPlayer() {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      console.log('Tracks added');
    } catch (error) {
      console.log(error);
    }
  };

  const [track, setTrack] = useState(null);
  const playbackState = usePlaybackState();

  async function start() {
    await TrackPlayer.play();
    const state = await TrackPlayer.getState();
    console.log('start: ', state);
  };

  async function pause() {
    const state = await TrackPlayer.getState();
    console.log('pause: ', state);
    await TrackPlayer.pause();
  };

  const getStateName = (state) => {
    switch (state) {
      case TrackPlayer.STATE_NONE:
        return "None";
      case TrackPlayer.STATE_PLAYING:
        return "Playing";
      case TrackPlayer.STATE_PAUSED:
        return "Paused";
      case TrackPlayer.STATE_STOPPED:
        return "Stopped";
      case TrackPlayer.STATE_BUFFERING:
        return "Buffering";
    }
  };

  // useEffect(() => {
  //   handleAudio();
  // }, []);

  // async function handleAudio() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require('./assets/RedLights.mp3')
  //   );
  //   setSound(sound);
  //   const status = await sound.getStatusAsync();
  //   console.log(status);
  // };

  // async function play() {
  //   console.log('play');
  //   await Audio.setAudioModeAsync({
  //     playsInSilentModeIOS: true,
  //   });
  //   try {
  //     const test = await sound.playAsync();
  //     // Unload sound from memory when done
  //     // await sound.unloadAsync();
  //     // console.log('unloaded');
  //   } catch (error) {
  //       console.log(error);
  //   }
  // };

  // async function pause() {
  //   console.log('pause');
  //   if (sound !== null) {
  //       const status = await sound.getStatusAsync();
  //       const pause = await sound.pauseAsync();
  //       await sound.setPositionAsync(status.positionMillis);
  //   };
  // };

  return (
    <View style={styles.screen}>
      <Text>NOEXPO: Open up App.js to start working on your app!</Text>
      {/* <Button title='PLAY' onPress={() => play()}/> */}
      {/* <Button title='PAUSE' onPress={() => pause()}/> */}
      <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.pause()}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.play()}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToPrevious()}
        >
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToNext()}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  btn: {
    backgroundColor: "#ff0044",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

export default App;