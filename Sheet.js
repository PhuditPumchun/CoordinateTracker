import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function SheetScreen({ data, setLocationData, setShowSheet }) {
  const generateCSV = () => {
    const header = 'ID, Latitude, Longitude, Accuracy, Time Interval, Distance Interval, Time\n';
    const rows = data
      .map((item, index) => 
        `${index + 1}, ${item.lat}, ${item.lon}, ${item.accuracy}, ${item.timeInterval},${item.distanceInterval}, ${item.time}`
      )
      .join('\n');
    return header + rows;
  };

  const saveCSV = async () => {
    const csv = generateCSV();
    const fileUri = FileSystem.documentDirectory + 'locationData.csv';

    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    Sharing.shareAsync(fileUri);
  };

  // ฟังก์ชันเคลียร์ข้อมูล
  const clearData = () => {
    setLocationData([]); // ล้างข้อมูลที่เก็บใน locationData
    alert("Cleared!!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Location Data</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          data.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text>{`ID: ${index + 1}, Latitude: ${item.lat}, Longitude: ${item.lon}, Accuracy: ${item.accuracy} meters, Time Interval: ${item.timeInterval} ms, Distance Interval: ${item.distanceInterval} meters, Time: ${item.time}`}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={saveCSV}
        >
          <Text style={styles.buttonText}>Save as CSV</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowSheet(false)}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        {/* ปุ่มเคลียร์ข้อมูล */}
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearData}
        >
          <Text style={styles.buttonText}>Clear Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    width: '30%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    width: '30%',
  },
});
