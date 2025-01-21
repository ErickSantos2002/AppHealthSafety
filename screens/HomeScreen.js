import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function HomeScreen({ onConnect, selectedDevice }) {
  return (
    <View style={styles.container}>
      {/* Centraliza a logo */}
      <View style={[styles.logoContainer, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={[styles.logo, { width: 400, height: 100 }]}
          resizeMode="contain"
        />
      </View>

      {/* Texto de status da conexão */}
      <Text style={[styles.connectionStatus, { textAlign: 'center', marginBottom: 20 }]}>
        {selectedDevice ? 'Dispositivo Conectado' : 'Nenhum dispositivo conectado'}
      </Text>

      {/* Botão no final da tela */}
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity style={styles.button} onPress={onConnect}>
          <Text style={styles.buttonText}>
            {selectedDevice ? 'Dispositivo Conectado' : 'Conectar Dispositivo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
