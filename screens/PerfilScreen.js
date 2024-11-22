import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Essa é a tela de perfil. Adicione os campos e informações aqui.</Text>
    </View>
  );
}
