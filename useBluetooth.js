import { useState } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const manager = new BleManager();

export const useBluetooth = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [writableCharacteristic, setWritableCharacteristic] = useState(null);
  const [monitorSubscription, setMonitorSubscription] = useState(null);

  const startScan = () => {
    setDevices([]);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Erro no escaneamento:", error);
        return;
      }
      if (device?.name) {
        setDevices((prevDevices) =>
          prevDevices.some((d) => d.id === device.id) ? prevDevices : [...prevDevices, { id: device.id, name: device.name }]
        );
      }
    });
    setTimeout(() => manager.stopDeviceScan(), 10000);
  };

  const connectToDevice = async (device) => {
    try {
      console.log(`Conectando ao dispositivo: ${device.name}`);
      const connectedDevice = await manager.connectToDevice(device.id);
      setConnectedDevice(connectedDevice);
      console.log("Conexão estabelecida com sucesso!");

      // Descobrir serviços e características
      await connectedDevice.discoverAllServicesAndCharacteristics();
      const services = await connectedDevice.services();
      const service = services.find((s) => s.uuid === '0000fff0-0000-1000-8000-00805f9b34fb');
      if (!service) throw new Error("Serviço 0000fff0 não encontrado.");

      const characteristics = await service.characteristics();

      // Configurar característica para escrita
      const writable = characteristics.find((c) => c.uuid === '0000fff2-0000-1000-8000-00805f9b34fb');
      if (!writable) throw new Error("Característica 0000fff2 não encontrada.");
      setWritableCharacteristic(writable);
      console.log("Característica configurada para escrita: 0000fff2");

      // Configurar característica para monitoramento (0000fff1)
      const notifiable = characteristics.find((c) => c.uuid === '0000fff1-0000-1000-8000-00805f9b34fb');
      if (notifiable) {
        console.log("Iniciando monitoramento de notificações na característica 0000fff1...");
        const subscription = notifiable.monitor((error, characteristic) => {
          if (error) {
            console.log("Erro no monitoramento:", error);
            return;
          }
          const rawData = Buffer.from(characteristic.value, 'base64');
          const commandCode = rawData.slice(1, 4).toString('utf-8').trim();
          const data = rawData.slice(4, 17).toString('utf-8').trim();
          const bat = rawData[17];
          console.log("Dados recebidos:", { commandCode, data, bat });
        });
        setMonitorSubscription(subscription);
      } else {
        console.log("Nenhuma característica notificável encontrada.");
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
    }
  };

  const sendCommand = async (command, data, bat) => {
    if (!writableCharacteristic) {
      console.error("Característica para escrita não configurada.");
      return;
    }

    try {
      const packet = createPacket(command, data, bat);
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
    const bytes = Buffer.concat([Buffer.from(commandCode, 'utf-8'), Buffer.from(data, 'utf-8'), Buffer.from([bat])]);
    bytes.forEach((byte) => (sum += byte));
    return (~sum + 1) & 0xff;
  };

  return {
    devices,
    connectedDevice,
    startScan,
    connectToDevice,
    sendCommand,
  };
};
