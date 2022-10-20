# Story: Sua própria carteira Crypto

## Idéia geral

Este desafio consiste em um sistema de recomendação manual de criptomoedas, juntamente com um sistema de carteiras de recomendações personalizadas para cada usuário, onde é possível analisar informações sobre as criptos recomendadas e manter elas na carteira ou não, ou seja, é uma típica _Producer/Consumer Application_, como você pode ver na imagem a seguir:

![image](https://user-images.githubusercontent.com/41883467/153203842-8889bbd8-e9e4-496c-b8ae-d9c6c6ec57e3.png)

## Entendendo o ecossistema

### Provider
O Provider é o servidor que servirá como a API do sistema, e deverá ser executado antes de todos os outros serviços atráves do `npm run provider`. O comando mencionado sobe um servidor mock com `json-server`, trazendo dados na estrutura de uma uma API de criptomoedas real com informações atualizadas do dia 02/02/2022.

### Producer
> Dependências: Provider

O Producer será o nosso servidor Websocket principal da aplicação, e também será responsável por rodar a CLI onde é possível listar informações sobre as cryptos através do provider e enviar recomendações de cryptos aos Consumers conectados. 

### Consumer
> Dependências: Producer

O Consumer será o nosso cliente Websocket que receberá as cryptos recomendadas pelo Producer, e irá rodar a CLI responsável pela visualização gráfica de histórico das cryptos recomendadas, bem como a gestão da carteira do Consumer em execução - note que podemos ter vários consumers rodando simultaneamente com carteiras locais diferentes.

## Funcionalidades

### Processo 01 (Lista de Crypto | Producer)

- Iniciar o servidor WS principal
- Listar as crypto moedas
- iniciar o mainLoop da CLI
  - Listar mais informações
  - Selecionar uma das currencies exibidas
    - quando selecionar, emitir evento para o _Processo 02_

### Processo 02 (Wallet | Consumer)

- Mostrar graficamente a crypto moeda selecionada atual
- Ouvir o evento de seleção de moeda para dicionar a moeda na Wallet
dicionar a moeda na Wallet
- Selecionar uma das moedas na Wallet para ser a moeda representada no gr[áfico
- Excluir uma das moedas na Wallet

## Estruturas utilizadas
- Generators, Iterators e Async Iterators
- Symbol
- Map e Set

### Como utilizar

Suba o ambiente de desenvolvimento, executando os seguintes comandos em terminais diferentes: `npm run provider`, `npm run producer`, `npm run consumer`.

https://user-images.githubusercontent.com/41883467/153467415-9c8091d2-97dc-4fcc-9edf-55b36bd098a3.mp4

> Nota: Considere `npm start` como `npm run producer` e `npm run client` como `npm run consumer` :)

### Extras

- [X] Desafio opcional: Caso queira, valide se é possível a implementação com WeakSet e WeakMap, implemente e/ou deixe um comentário sobre no código.
- [X] Desafio opcional: Caso queira, tente aplicar alguns testes no desafio e entender o funcionamento de cada trecho mais a fundo.


### Arquitetura

```
project
│   README.md
│   package.json
│
└───src
│   │  index.js
│   │  consumer-cli.js
│   │  producer-cli.js
│   │  producer-server.js
│   │  provider-server.json
│   │
│   └───config
│   │   │   language.js
│   │   │   terminal.js
│   │
│   └───entity
│   │   │   Crypto.js
│   │   │   User.js
│   │   │   Users.js
│   │
│   └───repository
│   │   │   CryptoRepository.js
│   │
│   └───service
│   │   │   IncomeService.js
│   │
│   └───util
│   │   │   Api.js
│   │   │   CustomTerminal.js
│
```

### Checklist features

- [X] Deve implementar a estrutura esperada em `util/CustomTerminal.js`

- [X] Deve implementar os métodos existentes em `service/CryptoService.js`

- [X] Deve implementar a estrutura esperada no arquivo `entity/User.js`

- [X] Deve implementar as estruturas esperadas no arquivo `entity/Users.js`