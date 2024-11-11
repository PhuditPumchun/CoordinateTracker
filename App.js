import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // นำเข้าไอคอนเฟืองจาก Ionicons
import * as Location from 'expo-location';
import OptionsScreen from './OptionsScreen';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [options, setOptions] = useState({
    accuracy: Location.Accuracy.Highest,
    timeInterval: 5000,
    distanceInterval: 1,
  });
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    let locationSubscription = null;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: options.accuracy,
          timeInterval: options.timeInterval,
          distanceInterval: options.distanceInterval,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [options]);

  const updateOptions = (newOptions) => {
    setOptions(newOptions);
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude} \n Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      {showOptions ? (
        <OptionsScreen options={options} updateOptions={updateOptions} setShowOptions={setShowOptions} />
      ) : (
        <>
          <Text style={styles.paragraph}>{text}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowOptions(true)}
          >
            <Ionicons name="settings" size={30} color="black" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5, // เพิ่มเงาเพื่อให้ดูเด่นขึ้น (เฉพาะ Android)
    shadowColor: '#000', // เพิ่มเงา (เฉพาะ iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
