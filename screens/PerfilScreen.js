import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../styles';

export default function PerfilScreen() {
  const [isServerTransferEnabled, setIsServerTransferEnabled] = useState(false);

  return (
    <View style={customStyles.container}>
      {/* Título */}
      <Text style={customStyles.title}>Perfil</Text>

      {/* Logo */}
      <View style={customStyles.logoContainer}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={[styles.logo, { width: 400, height: 100 }]}
          resizeMode="contain"
        />
      </View>

      {/* Grupo no final */}
      <View style={customStyles.bottomGroup}>
        {/* Inputs */}
        <TextInput
          style={customStyles.input}
          placeholder="Nome"
          placeholderTextColor="#888"
          multiline={false}
        />
        <TextInput
          style={customStyles.input}
          placeholder="Endereço"
          placeholderTextColor="#888"
          multiline={false}
        />
        <TextInput
          style={customStyles.input}
          placeholder="Telefone"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          multiline={false}
        />

        {/* Texto Informativo */}
        <Text style={customStyles.infoText}>
          Endereço, número de telefone e e-mail são usados apenas para fins de gerenciamento do bafômetro e não são utilizados para outros propósitos. Essas informações também podem ser usadas para atendimento ao cliente e devem ser mantidas atualizadas.
        </Text>

        {/* Botões */}
        <View style={customStyles.linkSwitchContainer}>
          <TouchableOpacity>
            <Text style={customStyles.linkText}>Fechar minha conta</Text>
          </TouchableOpacity>
          <View style={customStyles.switchContainer}>
            <Text style={customStyles.switchText}>Transferir para o servidor</Text>
            <Switch
              value={isServerTransferEnabled}
              onValueChange={(value) => setIsServerTransferEnabled(value)}
            />
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={customStyles.saveButton}>
          <Text style={customStyles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A148C', // Fundo roxo da tela
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  bottomGroup: {
    flex: 1,
    justifyContent: 'flex-end', // Posiciona o grupo no final
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  infoText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'justify',
    marginBottom: 20,
  },
  linkSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 10,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 10,
    color: '#fff',
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: '#03A9F4', // Azul destacado
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
