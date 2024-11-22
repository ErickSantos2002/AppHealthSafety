import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

export default function InformacoesDispositivoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações do Dispositivo</Text>
      <Text>Adicione os campos com as informações do dispositivo aqui.</Text>
    </View>
  );
}
