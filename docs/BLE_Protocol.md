# Protocolo Bluetooth BLE

Este documento descreve o protocolo de comunicação utilizado entre o aplicativo React Native e os dispositivos Bluetooth BLE. Ele inclui a estrutura do pacote, exemplos de comando e explicações sobre como interpretar respostas do dispositivo.

---

## **Estrutura do Pacote**

Cada pacote enviado e recebido segue a estrutura abaixo:

| Campo       | Tamanho  | Descrição                                       |
|-------------|----------|-------------------------------------------------|
| **STX**     | 1 byte   | Início do pacote. Sempre `0x02`.                |
| **Command** | 3 bytes  | Código do comando, definido pelo protocolo.     |
| **Data**    | 13 bytes | Dados relacionados ao comando. Preenchido com `#` caso não seja usado. |
| **BAT**     | 1 byte   | Nível da bateria (0 a 255).                     |
| **BCC**     | 1 byte   | Checksum para validação do pacote.              |
| **ETX**     | 1 byte   | Final do pacote. Sempre `0x03`.                 |

---

## **Cálculo do Checksum (BCC)**

O campo **BCC** é usado para verificar a integridade do pacote e é calculado da seguinte forma:

1. Some todos os bytes dos campos **Command**, **Data** e **BAT**.
2. Inverta todos os bits do resultado (complemento de 1).
3. Adicione 1 ao valor invertido.
4. Pegue apenas o byte menos significativo (LSB) do resultado.

**Exemplo de Cálculo do BCC**:

Suponha os seguintes valores:

- Command: `A20` → Bytes em hexadecimal: `41 32 30`
- Data: `TEST,START` → Bytes em hexadecimal: `54 45 53 54 2C 53 54 41 52 54 ## ## ##`
- BAT: `4` → Byte em hexadecimal: `04`

---

### Passo a passo:

- Soma dos bytes:
41 + 32 + 30 + 54 + 45 + 53 + 54 + 2C + 53 + 54 + 41 + 52 + 54 + 23 + 23 + 23 + 04 = 585 (decimal)
- Complemento de 1:
~585 = 0xFFFEFFA8 (em hexadecimal)
- Adicionando 1:
0xFFFEFFA8 + 1 = 0xFFFEFFA9
- Pegando o LSB:
0xFFA9 (LSB) = 0xA9
- Resultado do **BCC**: 
`0xA9`

---

## **Exemplo de Pacote**

### Pacote de Envio

Este é um exemplo de pacote enviado pelo aplicativo para iniciar um teste (`A20`):

| Campo   | Valor       | Tamanho | Descrição                              |
|---------|-------------|---------|----------------------------------------|
| **STX** | `0x02`      | 1 byte  | Início do pacote.                      |
| Command | `A20`       | 3 bytes | Código do comando.                     |
| Data    | `TEST,START`| 13 bytes| Dados do comando (preenchido com `#`). |
| BAT     | `0x04`      | 1 byte  | Nível da bateria.                      |
| BCC     | `0xA9`      | 1 byte  | Checksum calculado.                    |
| **ETX** | `0x03`      | 1 byte  | Final do pacote.                       |

**Pacote completo em hexadecimal**:
02 41 32 30 54 45 53 54 2C 53 54 41 52 54 23 23 23 04 A9 03


---

## **Comandos Suportados**

### Comandos de Envio

| Comando | Descrição                | Exemplo de Dados   |
|---------|--------------------------|--------------------|
| `A20`   | Iniciar Teste            | `TEST,START`       |
| `A21`   | Checar Tempo Restante    | `CHECK,TIME`       |
| `A01`   | Solicitar Informações    | `INFO,DEVICE`      |

---

### Respostas dos Comandos

| Comando | Descrição                | Exemplo de Dados       |
|---------|--------------------------|------------------------|
| `T12`   | Contagem Regressiva      | `299##########`        |
| `T10`   | Estado de Análise        | `ANALYZING####`        |
| `T11`   | Resultados da Análise    | `1,3,0.000,0##`        |
| `B20`   | Confirmação de Comando   | `OK###########`        |

---

## **Detalhes sobre os Comandos**

1. **Comando `A20`**: 
   - Inicia o processo de teste no dispositivo.
   - Exemplo de pacote enviado:
     ```
     02 41 32 30 54 45 53 54 2C 53 54 41 52 54 23 23 23 04 A9 03
     ```

2. **Comando `A21`**:
   - Solicita o tempo restante para o término de um processo.
   - Respostas típicas:
     ```
     T12 com contagem regressiva: 299##########
     ```

3. **Comando `A01`**:
   - Solicita informações gerais do dispositivo, como versão de firmware ou estado atual.

---

## **Erros e Soluções**

### Possíveis Erros de Comunicação

| Erro                 | Descrição                                | Solução                              |
|----------------------|------------------------------------------|--------------------------------------|
| Checksum inválido    | O valor de **BCC** recebido não confere. | Verifique o cálculo do **BCC**.     |
| Dados truncados      | Pacote incompleto.                      | Reenvie o comando.                  |
| Comando desconhecido | O dispositivo não reconhece o comando.  | Confira o comando enviado.          |

---

## **Fluxo de Comunicação**

1. O aplicativo escaneia dispositivos Bluetooth BLE disponíveis.
2. Conecta-se ao dispositivo selecionado.
3. Descobre os serviços e características disponíveis.
4. Envia comandos (e.g., `A20`, `A21`) pela característica configurada como gravável.
5. Monitora notificações e respostas pela característica de leitura/notificação.

---

## **Observações Finais**

- O protocolo foi projetado para ser robusto contra erros de transmissão, mas pacotes malformados ou interferências podem exigir retransmissões.
- Use logs detalhados durante o desenvolvimento para rastrear problemas de comunicação.
