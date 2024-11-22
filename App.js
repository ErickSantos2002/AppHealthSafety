import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { useBluetooth } from './useBluetooth'; // Hook para BLE
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styles from './styles';
import PerfilScreen from './screens/PerfilScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import InformacoesDispositivoScreen from './screens/InformacoesDispositivoScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const Tab = createBottomTabNavigator();
  const { devices, startScan, connectToDevice, sendCommand, receivedData } = useBluetooth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES, // Android 12+
        ]);

        const allGranted = Object.values(granted).every(
          (result) => result === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          console.error("Permissões de Bluetooth negadas.");
        }
      } catch (err) {
        console.error("Erro ao solicitar permissões de Bluetooth:", err);
      }
    }
  };

  requestPermissions();

  const handleOpenModal = () => {
    setModalVisible(true);
    startScan();
  };

  const handleDeviceSelect = async (device) => {
    await connectToDevice(device);
    setSelectedDevice(device);
    setModalVisible(false);
  };

  const handleDisconnect = () => {
    setSelectedDevice(null);
    console.log("Dispositivo desconectado.");
  };

  return (
    <View style={styles.container}>
      {/* Imagem do lo
      go */}
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#6a0dad', // Fundo roxo
            borderTopColor: 'transparent',
            height: 60,
          },
          tabBarLabelStyle: {
            color: '#fff', // Texto branco
            fontSize: 14,
          },
          tabBarIconStyle: { display: 'none' }, // Remove ícones, deixando apenas texto
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Principal' }} />
        <Tab.Screen name="Perfil" component={PerfilScreen} options={{ tabBarLabel: 'Perfil' }} />
        <Tab.Screen name="Historico" component={HistoricoScreen} options={{ tabBarLabel: 'Histórico' }} />
        <Tab.Screen
          name="InformacoesDispositivo"
          component={InformacoesDispositivoScreen}
          options={{ tabBarLabel: 'Dispositivo' }}
        />
        <Tab.Screen
          name="Configuracoes"
          component={ConfiguracoesScreen}
          options={{ tabBarLabel: 'Configurações' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
      <Image
        source={require('./assets/images/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bluetooth BLE App</Text>

      {/* Botões principais */}
      <View style={styles.buttonContainer}>
        {selectedDevice ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => sendCommand('A20', 'TEST,START', 4)}
            >
              <Text style={styles.buttonText}>Botão de Teste</Text>
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
