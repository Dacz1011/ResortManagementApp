import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodayStatusCard = ({ label, value, color }) => (
  <View style={[styles.card, { borderLeftColor: color }]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#fff', borderRadius: 8, borderLeftWidth: 4, marginVertical: 8, elevation: 2 },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 20, fontWeight: 'bold', marginTop: 5 }
});

export default TodayStatusCard;
