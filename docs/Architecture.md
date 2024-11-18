# Arquitetura do Projeto

Este documento explica a estrutura e a organização do projeto Bluetooth BLE App. A arquitetura foi projetada para ser modular e facilitar a manutenção, permitindo que as diferentes responsabilidades sejam separadas em arquivos específicos.

---

## Estrutura do Projeto

A estrutura do projeto é organizada como segue:


/
|-- App.js                  # Componente principal do aplicativo
|-- useBluetooth.js         # Hook personalizado para comunicação BLE
|-- styles.js               # Estilos globais do aplicativo
|-- /docs                   # Documentação adicional do projeto
|   |-- BLE_Protocol.md     # Descrição do protocolo BLE
|   |-- Architecture.md     # Arquitetura do projeto
|-- /assets                 # Recursos estáticos (imagens, ícones, etc.)
|-- /android                # Configurações específicas para Android
|-- /ios                    # Configurações específicas para iOS
|-- package.json            # Dependências e metadados do projeto
|-- README.md               # Documentação inicial do projeto


---

## Descrição dos Arquivos

### App.js
- Responsabilidade: 
  - Componente principal do aplicativo.
  - Integra a interface de usuário (UI) com as funcionalidades Bluetooth implementadas no `useBluetooth.js`.
- Funções-chave:
  - Renderiza a interface para escanear dispositivos e conectar a um dispositivo BLE.
  - Exibe os dados recebidos e permite o envio de comandos.

---

### useBluetooth.js
- Responsabilidade: 
  - Contém toda a lógica relacionada ao Bluetooth BLE, encapsulada em um hook personalizado.
- Funções-chave:
  - Escanear dispositivos BLE.
  - Conectar a um dispositivo e configurar características para escrita e monitoramento.
  - Enviar comandos para o dispositivo BLE.
  - Monitorar e processar notificações recebidas.

---

### styles.js
- Responsabilidade:
  - Armazena todos os estilos globais utilizados no aplicativo.
- Vantagem:
  - Centraliza a definição de estilos, facilitando a manutenção e a consistência visual do app.
- Exemplo:
  ```javascript
  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
  ```

---

### docs/

- Pasta dedicada à documentação adicional.
  - `BLE_Protocol.md`: Explica o protocolo de comunicação utilizado entre o aplicativo e o dispositivo BLE.
  - `Architecture.md`: Detalha a estrutura e a arquitetura do projeto.

---

### assets/

- Armazena recursos estáticos do aplicativo.
  - Exemplos: Ícones, imagens de fundo, logotipos, etc.

---

### android/ e ios/

- Contêm arquivos e configurações específicos para as plataformas Android e iOS.
- Exemplos:
  - Android:
    - Configurações de permissões no arquivo `AndroidManifest.xml`.
    - Dependências específicas para Bluetooth BLE no `build.gradle`.
  - iOS:
    - Configuração do Bluetooth no `Info.plist`.
    - Dependências instaladas via CocoaPods.

---

## Fluxo de Dados do Aplicativo

1. Interação do Usuário:
   - O usuário inicia o escaneamento de dispositivos BLE.
   - Seleciona um dispositivo para conectar.
2. Conexão Bluetooth:
   - O aplicativo se conecta ao dispositivo BLE selecionado.
   - Descobre os serviços e características disponíveis.
   - Configura as características para escrita e monitoramento.
3. Envio e Recebimento de Dados:
   - O aplicativo envia comandos para o dispositivo utilizando a característica configurada.
   - O dispositivo responde com notificações, que são exibidas ao usuário.

---

## Principais Dependências

| Dependência            | Versão       | Descrição                                     |
|------------------------|--------------|---------------------------------------------|
| `react-native`         | 0.71 ou maior| Framework para desenvolvimento mobile.       |
| `react-native-ble-plx` | 2.0.2 ou maior| Biblioteca para comunicação Bluetooth BLE.   |
| `buffer`               | 6.0.3 ou maior| Manipulação de buffers no JavaScript.        |

---

## Decisões de Design

- Separação de responsabilidades:
  - A lógica do Bluetooth BLE foi isolada em um hook (`useBluetooth.js`) para facilitar o teste e a reutilização.
- Centralização de estilos:
  - Os estilos foram organizados no arquivo `styles.js`, mantendo a UI limpa e desacoplada.
- Documentação extensiva:
  - Toda a comunicação com o dispositivo BLE está documentada no `BLE_Protocol.md`.
- Modularidade:
  - O projeto foi projetado para permitir a adição de novas funcionalidades sem impactar o núcleo existente.

---

## Futuras Melhorias

1. Testes Automatizados:
   - Adicionar testes unitários e de integração para garantir a estabilidade do aplicativo.
2. Suporte Multiplataforma Avançado:
   - Melhorar o suporte para dispositivos BLE com características específicas para Android e iOS.
3. **Interface de Usuário**:
   - Melhorar a experiência do usuário com uma interface mais intuitiva e estilizada.

---

## Conclusão

Este projeto é modular, organizado e fácil de manter. A separação de responsabilidades, aliada à documentação abrangente, facilita a escalabilidade e a contribuição de outros desenvolvedores.