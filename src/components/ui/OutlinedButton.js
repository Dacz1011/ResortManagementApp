import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const OutlinedButton = ({ title, onPress }) => (
  <TouchableOpacity style={[styles.button, { borderColor: colors.ownerGreen }]} onPress={onPress}>
    <Text style={[styles.text, { color: colors.ownerGreen }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
  text: { fontWeight: 'bold' }
});

export default OutlinedButton;
