import IncomeRepository from "./../repository/IncomeRepository.js";
import Income from "./../entity/Income.js";

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  async generateIncomeFromString(incomeString) {
    const delimiter = ";";
    const [position, expectation] = incomeString.split(delimiter);

    if (!position)
      throw new Error(
        "Position is a required field. Please make sure you are providing a position."
      );

    if (!Number(expectation))
      throw new Error(
        "A valid Expectation is required. Please note that only numbers are allowed."
      );

    const conversions = await this.incomeRepository.getConversions();

    const income = new Income({
      position,
      expectation: expectation.trim(),
      conversions
    });

    return income;
  }
}

export default IncomeService;
