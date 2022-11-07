# Story: Envio de Mensagens em Diferentes Plataformas

## Motivação

Você deverá criar um **Serviço de Envio de Mensagens**, apresentando a melhor grupo de padrões para **enviar mensagens em diferentes plataformas** com o máximo de planejamento e qualidade usando as boas práticas `DRY`, `KISS` e `YAGNI`, juntamente com `Clean Code` e `SOLID`, e lembrando de reconhecer os comportamentos em comum do sistema para aplicar os `Design Patterns` que melhor servir ao desenvolvimento da sua solução!

Design Patterns sugeridos para serem implementados aqui:
- [X] Factory
- [ ] Abstract Factory
- [X] N-Tiers Architecture
- [X] Dependency Injection 
- [X] Builder
- [ ] Fluent API
- [ ] Facade
- [ ] Test Data Builder
- [ ] Object Mother

## Idéia geral

Uma empresa específica necessita disponibilizar a aquisição e o uso de diferentes tipos de créditos para envios de mensagens. Os créditos podem ser divididos em: `e-mail`, `sms` e `whatsapp`. 

Cada tipo de crédito representará quantas mensagens o usuário poderá enviar na plataforma em questão. Exemplo: 1 crédito de `e-mail` permite que o usuário envie 1 mensagem via e-mail para qualquer destinatário.

### Até onde implementar?

Visando entregar uma POC (Proof Of Concept) do projeto, a empresa deseja que você apresente e implemente uma arquitetura que seja viável para o projeto, mas nesse estágio inicial não será necessário fazer o envio de mensagens de fato ou realizar qualquer integração com terceiros para a aquisição de créditos.

### Como validar a solução?

Ainda por ser um POC, o projeto não precisará ter uma interface gráfica (nem web e nem no terminal)! A saída dos dados e validação das funções deverá ser feita por meio de testes automatizados que cubram os comportamentos esperados e documentem muito bem todos cenários possíveis, visando ser uma boa documentação para implementações futuras.

## Requisitos do desafio

- [ ] Entendimento dos requisitos e implementação da solução
- [ ] Uso de **no mínimo 6** dos Design Patterns mencionados
- [ ] Documentação de quais Design Patterns decidiu usar e por quê no arquivo `ARCHITECTURE.md`
- [ ] Testes Unitários e **100% de Code Coverage**
- [ ] (opcional) Uso de TDD do início ao fim do projeto


### Arquitetura e onde trabalhar

```
project
│   README.md
│   ARCHITECTURE.md
│   package.json
│
│   // QUE OS JOGOS COMECEM
.
.
.
```