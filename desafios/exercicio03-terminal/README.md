# Story: Entendendo sua pretensão salarial em moedas estrangeiras 

Aproveitando que "já tá todo mundo bem Senior", como diria o grande Erick Wendel, a idéia é fazer
uma aplicação que permita que você insira seu cargo desejado e a sua pretensão salarial em BRL, e retorne a sua pretensão convertida em 3 diferentes moedas, para vocês já terem uma pequena idéia de 
quanto pedir nas entrevistas internacionais! :D 

Tudo isso, claro, enquanto entendemos conceitos importantes para uma Interface de Linha de Comando (CLI), renderização de informações no terminal, internacionalização e ainda de quebra um pouco de ECMAScript modules, como visto no `JS Expect - Módulo 04`, que trata de `Conceitos fundamentais sobre o ciclo de vida do Javascript - parte 02`!

## Funcionalidades

### Requisitos
1. Usando a Mock API fornecida no projeto (que você pode conferir tanto diretamente no arquivo `server.json` quanto executando `npm run server` no terminal e conferindo a saída em `localhost:3000/convert` no browser), escolha 3 das `moedas` retornadas para serem as suas moedas utilizadas no desafio (ex.: USD, EUR e RUB).

2. Implemente uma aplicação em linha de comando como a que vocês podem ver no vídeo abaixo, utilizando as `moedas` escolhidas para a realização do desafio:

https://user-images.githubusercontent.com/41883467/147079954-2ae5853d-8f1b-44a6-844f-396634bf7a89.mov

### Testes

Seguindo o padrão que já usamos anteriormente, é esperado que com o desafio pronto, ao rodar `npm run test` todos os testes devem passar. O resultado deve ser algo parecido com isso:

![image](https://user-images.githubusercontent.com/41883467/147080202-a47b8873-6e00-4d4e-b94b-a5e95933c50b.png)

### Extras

* [X] Desafio opcional: Note que não existem testes criados para o `terminal.js`. Então, caso queira, sinta-se livre para testar os métodos criados por você para a resolução desse desafio. 

### Checklist features

* [X] Deve identificar o que está faltando no arquivo `config/terminal.js`

* [X] Deve implementar a internacionalização no arquivo `entity/Income.js`

* [X] Deve implementar os métodos existentes em `repository/IncomeRepository`, assegurando que os testes em `IncomeRepository.test.js` estejam funcionando.

* [X] Deve implementar os métodos existentes em `service/IncomeService.js`, assegurando que os testes em `IncomeService.test.js` estejam funcionando.

* [X] Deve criar novos métodos e organizar a estrutura de criação do terminal em `terminal.js`

* [X] Deve entender e organizar o fluxo de chamada de funcões do terminal dentro do `mainLoop` em `index.js`