import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function OptionsScreen({ options, updateOptions, setShowOptions }) {
  const [accuracy, setAccuracy] = useState(options.accuracy);
  const [timeInterval, setTimeInterval] = useState(String(options.timeInterval));
  const [distanceInterval, setDistanceInterval] = useState(String(options.distanceInterval));

  const saveOptions = () => {
    updateOptions({
      accuracy: accuracy,
      timeInterval: parseInt(timeInterval, 10),
      distanceInterval: parseFloat(distanceInterval),
    });
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adjust Location Settings</Text>

      <Text style={styles.label}>Accuracy</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={accuracy}
          onValueChange={(itemValue) => setAccuracy(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="High" value={Location.Accuracy.High} />
          <Picker.Item label="Balanced" value={Location.Accuracy.Balanced} />
          <Picker.Item label="Lowest" value={Location.Accuracy.Lowest} />
        </Picker>
      </View>

      <Text style={styles.label}>Time Interval (ms)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={timeInterval}
        onChangeText={(text) => setTimeInterval(text)}
      />

      <Text style={styles.label}>Distance Interval (meters)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={distanceInterval}
        onChangeText={(text) => setDistanceInterval(text)}
      />

      <TouchableOpacity
            style={styles.saveButton}
            onPress={saveOptions}
          >
            <Ionicons name="save-outline" size={30} color="black" />
          </TouchableOpacity>

      <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowOptions(false)}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    right: -30,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
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
