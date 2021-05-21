import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio, Video } from 'expo-av';

export default function App() {

  const [sound, setSound] = useState(null);

  useEffect(() => {
    handleAudio();
  }, []);

  async function handleAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/RedLights.mp3')
    );
    setSound(sound);
    const status = await sound.getStatusAsync();
    console.log(status);
  };

  async function play() {
    console.log('play');
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    try {
      const test = await sound.playAsync();
      // Unload sound from memory when done
      // await sound.unloadAsync();
      // console.log('unloaded');
    } catch (error) {
        console.log(error);
    }
  };

  async function pause() {
    console.log('pause');
    if (sound !== null) {
        const status = await sound.getStatusAsync();
        const pause = await sound.pauseAsync();
        await sound.setPositionAsync(status.positionMillis);
    };
  };

  return (
    <View style={styles.container}>
      <Text>NOEXPO: Open up App.js to start working on your app!</Text>
      <Button title='PLAY' onPress={() => play()}/>
      <Button title='PAUSE' onPress={() => pause()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
