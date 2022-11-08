[entity]:https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/entity
[repository]:https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/repository
[service]: https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/service

[platform-base]: https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/_base
[credit-handler]: https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/_base/CreditHandler.js
[message-handler]: https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/_base/MessageHandler.js

# Documentação da arquitetura do projeto 

Design Patterns usados na implementação desse desafio:

- [X] N-Tiers Architecture
- [X] Dependency Injection 
- [X] Abstract Factory
- [X] Facade
- [X] Factory
- [X] Builder
- [X] Fluent API
- [X] Test Data Builder
- [X] Object Mother

## N-Tiers Architecture
   Padrão escolhido para definir as responsabilidades de cada parte da aplicação, assim trazendo organização e escalabilidade para o código.
   Dentre as diversas camadas escolhidas, as principais que mais representam o modelo são:
   - [Entity][entity]: usada para salvar informações importantes sobre as definições das entidades usadas no projeto.
   https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/entity/Message.js#L4-L11
   - [Repository][repository]: usada para manter implementação da interface de comunicação com o modelo de persistência de dados escolhido.
   https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/repository/userCreditRepository.js#L1-L8
   - [Service][service]:
usada para concentrar as principais regras de negócio e fazer uso das outras camadas desenvolvidas.
 https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/service/messageService.js#L1-L14
 
## Dependency Injection
   Usado para permitir melhor desacoplamento entre as camadas, possibilitando tanto extender o projeto no futuro, quanto tornar os testes mais práticos por permitir a injeção de dependências "Mockadas".
   https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/service/messageService.js#L2-L4

   https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/MessageSenderFacade.js#L6-L10

## Abstract Factory
   Usado para permitir a criação de um comportamento em comum que será implementado de diversas maneiras diferentes de acordo com a plataforma em questão.

   Optamos na [platform/_base][platform-base] em defenir os seguintes "implementadores/gerenciadores" (ou handlers):
   - [CreditHandler][credit-handler]: reponsável por gerenciar as interações com o meio de autenticação e consumo de créditos disponíveis para envio de cada usuário. 
   https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/_base/CreditHandler.js#L1-L18
   - [MessageHandler][message-handler]: responsável por gerenciar a implementação do envio de mensagens em si.
   https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/_base/MessageHandler.js#L1-L9

   Dessa forma cada plataforma de envio de mensagens pode manter o controle:
   - do próprio gerênciamento de crédito: assim, por exemplo, se os créditos de "whatsapp" precisarem ser autenticados no provedor "Y" e os créditos de "email" precisarem ser autenticados no provedor "Z", podemos fazer essa implementação diferente para cada caso sem interferir no fluxo da interface principal.
https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/email/credit.js#L3-L15
   - do próprio método de envio: assim, por exemplo, se um método de envio precisar ser disparado para um provedor terceiro que cuidará da criação de filas reativas e outras arquiteturas, podemos implementar assim. E, caso outro método de envio precise que nós mesmos criemos a arquitetura, podemos criar também sem interferir no fluxo da interface principal.
https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/email/sender.js#L3-L12

## Facade
   Pois reparamos que há uma sequência de processamento complexa que precisará ser executada sempre que nos utilizarmos dos `Handlers` definidos na nossa `Abstract Factory`. Sendo assim ganhamos uma vantagem em termos de organização de fluxos e reutilização de códigos concentrando essa estratégia de processamento dentro de uma classe implementando o padrão Facade.
https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/platforms/MessageSenderFacade.js#L12-L31

## Factory
   Como observamos na utilização do Facade, a estrutura criada (que depende de `CreditHandler`, `MessageHandler`, `UserRepository`, e etc) possui muitas dependências quando pretendemos executar o fluxo esperado, usar o padrão de Factory para concentrar o processo de instanciar e referenciar essas dependências facilita a utilização do nosso código.
https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/src/factory/messageSenderFactory.js#L5-L30

## Test Data Builder (Internamente Fluent API e Builder)
   Nesse caso optamos por usar o padrão Test Data Builder para construir e documentar cenários de construção de objeto úteis na confecção de testes, permitindo o encadeamento de diversos métodos (Fluent API)
https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/test/unit/model/MessageDataBuilder.js#L12-L25

Que juntos formam um objeto que é construído no final do processo (com o `.build`, do padrão Builder). 
https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/test/unit/model/MessageDataBuilder.js#L32-L41

## Object Mother
   Utilizado para fazer uso dos casos possíveis com o Test Data Builder, criando cenários específicos para podermos utilizar nos testes de forma ainda mais organizada. Por exemplo: `cenário1: objeto().validX().invalidY.build(); cenário2: objeto().invalidX().validY().build`. De certa forma, podemos comparar o objetivo do Object Mother com o do Facade: concentrar sequências de processos em comportamentos específicos para facilitar o uso no projeto.
https://github.com/WellsSA/jsexpert-challenge06-patterns-solution/blob/f9437123de22b4dc99a841f537b4b1cfe03163f4/test/unit/model/MessageMotherObject.js#L3-L15