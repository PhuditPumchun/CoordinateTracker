import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import OptionsScreen from './OptionsScreen';
import SheetScreen from './Sheet';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [options, setOptions] = useState({
    accuracy: Location.Accuracy.Highest,
    timeInterval: 5000,
    distanceInterval: 1,
  });
  const [showOptions, setShowOptions] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    let locationSubscription = null;
    let timer = null;
    let locations = [];

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
          locations.push(newLocation.coords);
        }
      );

      timer = setInterval(() => {
        if (locations.length > 0) {
          const avgLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
          const avgLon = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;
          const avgAcc = locations.reduce((sum, loc) => sum + loc.accuracy, 0) / locations.length;

          setLocationData((prevData) => [
            ...prevData,
            {
              lat: avgLat,
              lon: avgLon,
              accuracy: avgAcc,
              timeInterval: options.timeInterval,
              distanceInterval: options.distanceInterval,
              time: new Date().toLocaleString(),
            },
          ]);
          locations = [];
        }
      }, options.timeInterval);

    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      clearInterval(timer);
    };
  }, [options]);

  const updateOptions = (newOptions) => {
    setOptions(newOptions);
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const { latitude, longitude, accuracy } = location.coords;
    text = `Latitude: ${latitude} \nLongitude: ${longitude} \nAccuracy: ${accuracy} meters`;
  }

  return (
    <View style={styles.container}>
      {showOptions ? (
        <OptionsScreen options={options} updateOptions={updateOptions} setShowOptions={setShowOptions} />
      ) : showSheet ? (
        <SheetScreen data={locationData} setLocationData={setLocationData} setShowSheet={setShowSheet} />
      ) : (
        <>
          <Text style={styles.paragraph}>{text}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowOptions(true)}
          >
            <Ionicons name="settings" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setShowSheet(true)}
          >
            <Ionicons name="document-text" size={30} color="black" />
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
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  saveButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
