import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReineFinance = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Reine Finance</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' }
});

export default ReineFinance;
