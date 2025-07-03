import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapScreen from './MapScreen';
import FilterPanel from '../components/FilterPanel';

export default function HomeScreen({ navigation }) {
  // MapScreen already manages its own search & filter state internally
  // Here we simply render the map plus overlay filter panel toggle
  return (
    <View style={styles.container}>
      <MapScreen navigation={navigation} route={{ params: {} }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 