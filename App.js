import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useBluetooth } from './useBluetooth'; // Hook para BLE
import styles from './styles';

export default function App() {
  const { devices, startScan, connectToDevice, sendCommand, receivedData } = useBluetooth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Abre o modal e inicia o escaneamento
  const handleOpenModal = () => {
    setModalVisible(true);
    startScan(); // Inicia o escaneamento Bluetooth
  };

  // Seleciona o dispositivo e fecha o modal
  const handleDeviceSelect = async (device) => {
    await connectToDevice(device); // Conecta ao dispositivo
    setSelectedDevice(device); // Salva o dispositivo selecionado
    setModalVisible(false); // Fecha o modal
  };

  // Desconectar do dispositivo
  const handleDisconnect = () => {
    setSelectedDevice(null); // Remove o dispositivo selecionado
    console.log("Dispositivo desconectado.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth BLE App</Text>

      {/* Botões principais */}
      <View style={styles.buttonContainer}>
        {selectedDevice ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => sendCommand('A20', 'TEST,START', 4)}
            >
              <Text style={styles.buttonText}>Iniciar Teste</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.disconnectButton]}
              onPress={handleDisconnect}
            >
              <Text style={styles.buttonText}>Desconectar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
            <Text style={styles.buttonText}>Conectar Dispositivo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Exibição de Dados Recebidos */}
      {selectedDevice && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Últimos Dados Recebidos:</Text>
          {receivedData.length > 0 ? (
            receivedData.slice(0, 5).map((item, index) => (
              <Text key={index} style={styles.dataText}>
                Comando: {item.commandCode}, Dados: {item.data}
              </Text>
            ))
          ) : (
            <Text style={styles.dataText}>Nenhum dado recebido.</Text>
          )}
        </View>
      )}

      {/* Modal para selecionar dispositivos */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um Dispositivo</Text>
            <FlatList
              data={devices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleDeviceSelect(item)}>
                  <Text style={styles.device}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
