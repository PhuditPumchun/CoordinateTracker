import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function CollectScreen({ options, setShowCollectScreen }) {
  const [duration, setDuration] = useState(1); 
  const [locationData, setLocationData] = useState([]);
  const [averageLocation, setAverageLocation] = useState(null);
  const [isCollecting, setIsCollecting] = useState(false);

  const startCollection = async () => {
    setIsCollecting(true);
    setLocationData([]); 
    setAverageLocation(null);

    const endTime = Date.now() + duration * 60000;

    const locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: options.accuracy,
        timeInterval: options.timeInterval,
        distanceInterval: options.distanceInterval,
      },
      (newLocation) => {
        setLocationData((prevData) => [...prevData, newLocation.coords]);
      }
    );

    const stopCollection = () => {
      locationSubscription.remove();
      setIsCollecting(false);

      if (locationData.length > 0) {
        const avgLat = locationData.reduce((sum, loc) => sum + loc.latitude, 0) / locationData.length;
        const avgLon = locationData.reduce((sum, loc) => sum + loc.longitude, 0) / locationData.length;
        const avgAcc = locationData.reduce((sum, loc) => sum + loc.accuracy, 0) / locationData.length;

        setAverageLocation({ lat: avgLat, lon: avgLon, accuracy: avgAcc });
      } else {
        alert("No location data collected.");
      }
    };

    setTimeout(stopCollection, duration * 60000);
  };

  const retryCollection = () => {
    setAverageLocation(null); 
    setLocationData([]); 
  };

  return (
    <View style={styles.container}>
      {averageLocation ? (
        <View style={styles.resultContainer}>
          <Text style={styles.text}>Average Latitude: {averageLocation.lat}</Text>
          <Text style={styles.text}>Average Longitude: {averageLocation.lon}</Text>
          <Text style={styles.text}>Average Accuracy: {averageLocation.accuracy} meters</Text>
          <View style={styles.buttonContainer}>
            <Button title="Retry" onPress={retryCollection} />
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Specify Duration (in minutes):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={duration.toString()}
            onChangeText={(value) => setDuration(parseInt(value) || 1)}
            editable={!isCollecting} 
          />
          <View style={styles.buttonContainer}>
            <Button
              title={isCollecting ? "Collecting..." : "Start Collection"}
              onPress={startCollection}
              disabled={isCollecting} 
            />
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => setShowCollectScreen(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginVertical: 10, 
  },
});
