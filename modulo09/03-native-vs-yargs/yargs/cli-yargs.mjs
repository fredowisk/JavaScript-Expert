import yargs from "yargs";

import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });
const { argv } = yargs(hideBin(process.argv))
  .command("createHero", "create a hero", (builder) => {
    return builder
      .option("name", {
        alias: "n",
        demand: true,
        describe: "hero name",
        type: "string",
      })
      .option("age", {
        alias: "a",
        demand: true,
        describe: "hero age",
        type: "number",
      })
      .option("power", {
        alias: "p",
        demand: true,
        describe: "hero power",
        type: "string",
      })
      .example(
        "createHero --name Flash --age 55 --power Speed",
        "create a hero"
      )
      .example("createHero -n Flash -a 55 -p Speed", "create a hero");
  })
  .epilog("copyright 2022 - Fredowisk Corporation");

console.log(hero(argv));
