import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles';

export default function ConfiguracoesScreen() {
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isRearCameraEnabled, setIsRearCameraEnabled] = useState(false);
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);
  const [isCalibrationReminderEnabled, setIsCalibrationReminderEnabled] = useState(false);
  const [graphUnit, setGraphUnit] = useState('g/L');
  const [soundLevel, setSoundLevel] = useState(5);
  const [country, setCountry] = useState('Brasil');
  const [warningLevel, setWarningLevel] = useState('0.300');
  const [dangerLevel, setDangerLevel] = useState('0.500');
  const [alcoholDetectionSound, setAlcoholDetectionSound] = useState('Som 1');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Conteúdo Scrollable */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Switches */}
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Câmera</Text>
          <Switch value={isCameraEnabled} onValueChange={setIsCameraEnabled} />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Câmera traseira</Text>
          <Switch value={isRearCameraEnabled} onValueChange={setIsRearCameraEnabled} />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.text}>GPS</Text>
          <Switch value={isGPSEnabled} onValueChange={setIsGPSEnabled} />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Lembrete de calibração</Text>
          <Switch
            value={isCalibrationReminderEnabled}
            onValueChange={setIsCalibrationReminderEnabled}
          />
        </View>

        {/* Unidade do gráfico */}
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Unidade do gráfico</Text>
          <Picker
            selectedValue={graphUnit}
            onValueChange={(itemValue) => setGraphUnit(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="g/L" value="g/L" />
            <Picker.Item label="%" value="%" />
            <Picker.Item label="%BAC" value="%BAC" />
            <Picker.Item label="mg/L" value="mg/L" />
            <Picker.Item label="mg/100mL" value="mg/100mL" />
            <Picker.Item label="ug/100mL" value="ug/100mL" />
            <Picker.Item label="ug/L" value="ug/L" />
          </Picker>
        </View>

        {/* País */}
        <View style={styles.switchContainer}>
          <Text style={styles.text}>País</Text>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Brasil" value="Brasil" />
            <Picker.Item label="Estados Unidos" value="Estados Unidos" />
            <Picker.Item label="Canadá" value="Canadá" />
            <Picker.Item label="Alemanha" value="Alemanha" />
            <Picker.Item label="França" value="França" />
          </Picker>
        </View>

        {/* Inputs de Nível de Aviso e Perigo */}
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Nível de Aviso</Text>
          <TextInput
            style={styles.input}
            value={warningLevel}
            onChangeText={setWarningLevel}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Nível de Perigo</Text>
          <TextInput
            style={styles.input}
            value={dangerLevel}
            onChangeText={setDangerLevel}
            keyboardType="numeric"
          />
        </View>

        {/* Botões clicáveis */}
        <TouchableOpacity>
          <Text style={styles.text}>Exportar meus dados</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Política de Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Manual do Bafômetro</Text>
        </TouchableOpacity>

        {/* Som de detecção de álcool */}
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Som de detecção de álcool</Text>
          <Picker
            selectedValue={alcoholDetectionSound}
            onValueChange={(itemValue) => setAlcoholDetectionSound(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Som 1" value="Som 1" />
            <Picker.Item label="Som 2" value="Som 2" />
            <Picker.Item label="Som 3" value="Som 3" />
          </Picker>
        </View>

        {/* Versão */}
        <Text style={styles.textCenter}>Versão do Software: 1.0</Text>
      </ScrollView>

      {/* Botão Sair */}
      <View style={styles.exitButtonContainer}>
        <TouchableOpacity style={styles.exitButton}>
          <Text style={styles.exitButtonText}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
