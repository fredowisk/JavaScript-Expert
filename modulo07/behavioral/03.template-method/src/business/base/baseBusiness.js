import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }

  _create(data) {
    throw new NotImplementedException(this._create.name);
  }

  /*
  Padrão do Martin Fowler
  a proposta do padrão é garantir o fluxo de métodos, definindo uma sequência
  a ser executada

  esse create é a implementação efetiva do Template Method
  */

  create(data) {
    // validar campos
    const isValid = this._validateRequiredFields(data);

    if (!isValid) throw new Error(`invalid data!`);

    // salvar no banco
    return this._create(data);
  }
}
