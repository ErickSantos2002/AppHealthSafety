import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useBluetooth } from './useBluetooth';
import styles from './styles';

export default function App() {
  const { devices, connectedDevice, startScan, connectToDevice, sendCommand } = useBluetooth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escaneamento de Dispositivos Bluetooth</Text>
      <Button title="Iniciar Escaneamento" onPress={startScan} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => connectToDevice(item)}>
            <Text style={styles.device}>{item.name} - {item.id}</Text>
          </TouchableOpacity>
        )}
      />
      {connectedDevice && (
        <View>
          <Text>Dispositivo Conectado: {connectedDevice.name}</Text>
          <Button title="Enviar Comando" onPress={() => sendCommand("A20", "TEST,START", 4)} />
        </View>
      )}
    </View>
  );
}
