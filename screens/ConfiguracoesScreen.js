import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

export default function ConfiguracoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text>Adicione as opções de configurações aqui.</Text>
    </View>
  );
}
