# Story: Seu primeiro time pokemon

Consumindo a [PokeAPI](https://pokeapi.co/), faça uma API que retorne 3 pokemóns aleatórios para formar seu time inicial numa jornada pokemon.

## Requisitos

### Funcionalidades
1. `GET /` 

Deve ser a rota padrão da aplicação ao tentar acessar qualquer rota inexistente. (ex.: `/hi`, `/hello`)

2. `GET /team`

Deve retornar um array com 3 pokemóns aleatórios, contendo seus respectivos `name` e `moves`, (mostrando apenas um array de strings com os 3 primeiros `moves` presentes na API. ex.: `["mega-punch","fire-punch","thunder-punch"]`).


### Testes

* [X] mocks
* [ ] stubs
* [X] spies
* [X] testes end-2-end
* [X] testes unitários
* [X] 100% de code coverage

### Extras

* [X] TDD e BDD, será que rola? Acho que vale a tentativa!
* [X] Que tal consumir a API sem usar libs externas? o módulo `https` do node pode ser bem interessante!

### Checklist features

- Web API
  * [X] Deve ter uma rota raiz usada como _fallback_.
  * [X] Deve ter uma rota de `/team`, onde: 
    * [X] Deve consumir a PokeAPI e selecionar 3 pokemóns aleatórios
    * [X] Deve consumir a PokeAPI para obter mais informações sobre os pokemóns escolhidos
    * [X] Deve retornar um objeto JSON contendo um array com 3 pokemóns, cada um com seus respectivos `name (String)` e `moves (String[])`

- Testes
  * [X] Deve ter cobertura de testes end-2-end e unitários
  * [X] 100% de code coverage
