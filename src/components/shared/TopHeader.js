import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: { padding: 20, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold' }
});

export default TopHeader;
