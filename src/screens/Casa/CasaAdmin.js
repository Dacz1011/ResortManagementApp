import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CasaAdmin = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Casa M.O. Admin Tools</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' }
});

export default CasaAdmin;
