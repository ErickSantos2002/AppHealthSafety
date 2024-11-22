import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6a0dad', // Fundo roxo
  },
  logo: {
    width: 200, // Largura do logo aumentada
    height: 200, // Altura do logo aumentada
    marginTop: 40, // Move o logo mais para cima
    marginBottom: 30, // Espaço abaixo do logo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Texto branco
  },
  button: {
    backgroundColor: '#6a0dad', // Roxo
    padding: 15,
    borderRadius: 8,
    marginTop: 30, // Mais espaço entre o logo e o botão
    borderWidth: 2,
    borderColor: '#fff', // Contorno branco
    width: 200, // Largura do botão
    alignSelf: 'center', // Centraliza o botão
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disconnectButton: {
    backgroundColor: '#b71c1c', // Vermelho para o botão de desconectar
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro transparente
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5, // Sombra no Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6a0dad', // Roxo
  },
  device: {
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    textAlign: 'center',
  },
  dataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dataText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 50, // Move os botões mais para baixo
    justifyContent: 'center',
    alignItems: 'center',
  },
});
