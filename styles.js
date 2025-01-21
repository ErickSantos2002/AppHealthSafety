import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6a0dad', // Fundo roxo
  },
  fullWidthContainer: {
    flex: 1,
    width: '100%', // O container ocupa toda a largura disponível
    paddingHorizontal: 16, // Mantém o espaçamento horizontal consistente
  },
  title: {
    fontSize: 28, // Maior para destaque
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Texto branco
  },
  text: {
    fontSize: 18, // Textos maiores
    color: '#fff',
    marginVertical: 10, // Espaçamento entre os elementos
  },
  textCenter: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 200, // Largura do logo aumentada
    height: 200, // Altura do logo aumentada
    marginTop: 40, // Move o logo mais para cima
    marginBottom: 30, // Espaço abaixo do logo
  },
  configButton: {
    // Botões de configuração
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  input: {
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  picker: {
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  exitButtonContainer: {
    width: '100%', // O container do botão ocupa toda a largura da tela
    bottom: 0, // Fixa na parte inferior
    left: 0,
    right: 0,
    backgroundColor: '#6a0dad', // Cor de fundo para preencher a largura
    paddingVertical: 10,
  },
  exitButton: {
    backgroundColor: '#b71c1c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
