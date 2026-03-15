import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const PrimaryButton = ({ title, onPress }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: colors.ownerGreen }]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { padding: 15, borderRadius: 8, alignItems: 'center' },
  text: { color: '#fff', fontWeight: 'bold' }
});

export default PrimaryButton;
