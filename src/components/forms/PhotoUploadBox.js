import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PhotoUploadBox = ({ onSelect, imageUri }) => (
  <TouchableOpacity style={styles.box} onPress={onSelect}>
    {imageUri ? (
      <Image source={{ uri: imageUri }} style={styles.image} />
    ) : (
      <View style={styles.placeholder}>
        <Ionicons name="camera-outline" size={40} color="#999" />
        <Text style={styles.text}>Add Photo</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: { width: '100%', height: 200, backgroundColor: '#eee', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginVertical: 15 },
  placeholder: { alignItems: 'center' },
  image: { width: '100%', height: '100%', borderRadius: 12 },
  text: { color: '#999', marginTop: 10 }
});

export default PhotoUploadBox;
