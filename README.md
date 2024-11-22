# Projeto Bluetooth BLE App

Este projeto é um aplicativo React Native desenvolvido para comunicação com dispositivos Bluetooth BLE. Ele permite escanear dispositivos, conectar-se, enviar comandos específicos e monitorar respostas, utilizando um protocolo de comunicação pré-definido.

---

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Protocolo Bluetooth](#protocolo-bluetooth)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas antes de iniciar o projeto:

- **Node.js**: Versão 16 ou superior.
- **React Native CLI**: Para rodar o aplicativo.
- **Dispositivo com Bluetooth BLE**: Para testes e validação.

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JeromeReal/AppHealthSafety.git
   cd AppHealthSafety

2. Instale as dependências:
    npm install

3. Inicie o projeto:
    ### Android
    npx react-native run-android
    ### iOS
    npx react-native run-ios
    ### Para um dispositivo Android específico
    npx react-native run-android --deviceId <device_id>

---

## Arquitetura do Projeto

A estrutura do projeto é organizada da seguinte forma:

/
|-- App.js                # Componente principal do app
|-- useBluetooth.js       # Hook personalizado para BLE
|-- styles.js             # Estilos do aplicativo
|-- docs/
    |-- BLE_Protocol.md   # Detalhes sobre o protocolo BLE
    |-- Architecture.md   # Estrutura do projeto

---

## Principais Funcionalidades

    Escanear dispositivos BLE: Identifica dispositivos Bluetooth próximos.
    Conectar ao dispositivo BLE: Estabelece uma conexão com um dispositivo específico.
    Enviar comandos: Permite enviar comandos como A20 para iniciar um teste.
    Monitoramento de dados: Recebe notificações e respostas de estados do dispositivo.

---

## Protocolo Bluetooth

A comunicação segue a estrutura abaixo:

### Estrutura do Pacote

Campo	|   Tamanho	   |    Descrição
STX	        1 byte	        Sempre 0x02.
Command	    3 bytes	        Código do comando (e.g., A20).
Data	    13 bytes	    Dados relacionados ao comando.
BAT	        1 byte	        Nível da bateria.
BCC	        1 byte	        Checksum para validação.
ETX	        1 byte	        Sempre 0x03.

### Exemplo de Pacote

STX | Command | Data             | BAT | BCC | ETX
02H   A20       TEST,START####     04    F6    03H

### Comandos Suportados

Comando	|   Descrição	            |   Data que precisa ser enviada junto  |   Exemplo de dados
A01         Versão do Firmware          INFORMATION                             0.02,AL8800BT
A03         Contagem de Uso             0 ou 1 ou 2                             
A04         Informação de Calibração    0 ou 1 ou 2
A05         Mudar unidade de medida     0 a 5
A06         Verificar Alarme Calibração CAL,CHECK
A19         Mudança de volume           0 a 4
A20	        Iniciar Teste	            TEST,START
A22         Voltar para espera          SOFT,RESET

### Respostas dos Comandos

Comando	|   Descrição	            |   Exemplo de Dados
T12	        Contagem Regressiva	        299##########
T10	        Estado de Análise	        ANALYZING####
T11	        Resultados da Análise	    1,3,0.000,0##

---

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para suas alterações:
    git checkout -b minha-nova-feature
3. Faça o commit das alterações:
    git commit -m "Adicionei nova funcionalidade"
4. Envie as alterações para o repositório remoto:
    git push origin minha-nova-feature
5. Crie um Pull Request no GitHub.

---

## Licença

Este projeto está licenciado sob a Licença MIT.

Contato
Se tiver dúvidas ou sugestões, entre em contato por meio do repositório.

---

### Observações

- Salve o arquivo como `README.md` na raiz do projeto.
- Caso precise expandir as informações, crie pastas como `docs/` para adicionar documentação específica, como o detalhamento do protocolo BLE (`BLE_Protocol.md`).
- Pode incluir imagens e gráficos se necessário, utilizando serviços como GitHub Assets ou repositórios de imagens externas.