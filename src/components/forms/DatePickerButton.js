import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DatePickerButton = ({ label, date, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
        <Text style={styles.date}>{date || 'Select Date'}</Text>
        <Ionicons name="calendar-outline" size={20} color="#666" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { marginVertical: 10, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  label: { fontSize: 12, color: '#666', marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 16 }
});

export default DatePickerButton;
