import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../images/Logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Conectar Dispositivo</Text>
      </TouchableOpacity>
    </View>
  );
}
