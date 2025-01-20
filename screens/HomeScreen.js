import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function HomeScreen({ onConnect, selectedDevice }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <Text style={styles.buttonText}>
          {selectedDevice ? 'Dispositivo Conectado' : 'Conectar Dispositivo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}