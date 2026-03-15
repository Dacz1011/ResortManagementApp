import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScheduleCard = ({ time, title, subtitle }) => (
  <View style={styles.card}>
    <Text style={styles.time}>{time}</Text>
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', borderRadius: 8, marginVertical: 5, elevation: 1 },
  time: { fontWeight: 'bold', width: 60 },
  info: { flex: 1 },
  title: { fontWeight: '600' },
  subtitle: { color: '#666', fontSize: 12 }
});

export default ScheduleCard;
