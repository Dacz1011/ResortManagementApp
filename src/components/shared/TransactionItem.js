import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionItem = ({ title, amount, date, type }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
    <Text style={[styles.amount, { color: type === 'income' ? 'green' : 'red' }]}>
      {type === 'income' ? '+' : '-'}{amount}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontWeight: 'bold' },
  date: { fontSize: 12, color: '#666' },
  amount: { fontWeight: 'bold' }
});

export default TransactionItem;
