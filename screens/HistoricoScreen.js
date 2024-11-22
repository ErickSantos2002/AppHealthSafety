import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

export default function HistoricoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <Text>Essa é a tela de histórico. Adicione o gráfico e listas aqui.</Text>
    </View>
  );
}
