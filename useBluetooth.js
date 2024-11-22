import { useState } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const manager = new BleManager();

export const useBluetooth = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [writableCharacteristic, setWritableCharacteristic] = useState(null); // Característica de escrita
  const [receivedData, setReceivedData] = useState([]); // Dados reais recebidos

  const startScan = () => {
    setDevices([]);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Erro no escaneamento:", error);
        return;
      }
      if (device?.name) {
        setDevices((prev) =>
          prev.some((d) => d.id === device.id) ? prev : [...prev, { id: device.id, name: device.name }]
        );
      }
    });
    setTimeout(() => manager.stopDeviceScan(), 10000);
  };

  const connectToDevice = async (device) => {
    try {
      console.log(`Tentando conectar ao dispositivo: ${device.name}`);
      const connected = await manager.connectToDevice(device.id);
      setConnectedDevice(connected);
  
      console.log("Aguardando estabilização...");
      await delay(500); // Aguarda para estabilizar a conexão
  
      console.log("Descobrindo serviços e características...");
      await connected.discoverAllServicesAndCharacteristics();
      await delay(500);
  
      const characteristics = await connected.characteristicsForService('0000fff0-0000-1000-8000-00805f9b34fb');
      const writable = characteristics.find((char) => char.uuid === '0000fff2-0000-1000-8000-00805f9b34fb');
      const notifiable = characteristics.find((char) => char.uuid === '0000fff1-0000-1000-8000-00805f9b34fb');
  
      if (!writable) {
        throw new Error("Nenhuma característica gravável encontrada.");
      }
  
      setWritableCharacteristic(writable);
      console.log(`Característica configurada para escrita: ${writable.uuid}`);
  
      // Configuração de Notificações
      if (notifiable) {
        console.log(`Ativando notificações para a característica: ${notifiable.uuid}`);
        notifiable.monitor((error, characteristic) => {
          if (error) {
            console.error("Erro ao monitorar:", error);
            return;
          }
          if (characteristic?.value) {
            const value = Buffer.from(characteristic.value, 'base64');
            const commandCode = value.slice(1, 4).toString('utf-8').trim();
            const data = value.slice(4, 17).toString('utf-8').replace(/#/g, '');
            setReceivedData((prev) => [{ commandCode, data }, ...prev]);
            console.log(`Notificação recebida: Comando: ${commandCode}, Dados: ${data}`);
          }
        });
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
    }
  };
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const sendCommand = async (command, data, bat) => {
    if (!writableCharacteristic) {
      console.error("Característica para escrita não configurada.");
      return;
    }
  
    const packet = createPacket(command, data, bat);
    if (packet.length > 20) {
      console.error("Tamanho do pacote inválido:", packet.length);
      return;
    }
  
    try {
      console.log("Enviando comando:", { command, data, bat, packet });
      await writableCharacteristic.writeWithResponse(packet.toString('base64'));
      console.log(`Comando ${command} enviado com sucesso!`);
    } catch (error) {
      console.error("Erro ao enviar comando:", error);
    }
  };

  const createPacket = (command, data, bat) => {
    const stx = 0x02;
    const etx = 0x03;
    const commandCode = command.padEnd(3, ' ');
    const paddedData = data.padEnd(13, '#');
    const bcc = calculateBCC(commandCode, paddedData, bat);

    return Buffer.from([
      stx,
      ...Buffer.from(commandCode, 'utf-8'),
      ...Buffer.from(paddedData, 'utf-8'),
      bat,
      bcc,
      etx,
    ]);
  };

  const calculateBCC = (commandCode, data, bat) => {
    let sum = 0;
    const bytes = Buffer.concat([
      Buffer.from(commandCode, 'utf-8'),
      Buffer.from(data, 'utf-8'),
      Buffer.from([bat]),
    ]);
    bytes.forEach((byte) => (sum += byte));
    return (~sum + 1) & 0xff;
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      await manager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setWritableCharacteristic(null);
      console.log("Dispositivo desconectado com sucesso.");
    }
  };

  return {
    devices,
    connectedDevice,
    startScan,
    connectToDevice,
    sendCommand,
    receivedData,
    disconnectDevice,
  };
};
