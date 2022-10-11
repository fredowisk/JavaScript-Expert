import timers from "timers/promises";

const timeoutAsync = timers.setTimeout;

// Executa de forma paralela

// const results = Promise.all(
//   ["1", "2"].map(async (item) => {
//     console.log("Starting process!!");
//     await timeoutAsync(100);
//     console.log(item);
//     console.log(await Promise.resolve("timeout order!"));
//     await timeoutAsync(100);
//     console.count("debug");

//     return parseInt(item) * 2;
//   })
// );

// console.log("results", await results);

setTimeout(async () => {
  console.log("Starting process!!");
  await timeoutAsync(100);
  console.count("debug");
  console.log(await Promise.resolve("timeout order!"));
  await timeoutAsync(100);
  console.count("debug");

  await Promise.reject("error timeout!");
}, 1000);

const throwError = (msg) => {
  throw new Error(msg);
};

try {
  console.log("hello");
  console.log("world");
  throwError("erro dentro do try/catch");
} catch (error) {
  console.log("pego no catch!", error.message);
} finally {
  console.log("executed after all!");
}

process.on("uncaughtException", (e) => {
  console.log("uncaughtException", e.message || e);
});
process.on("unhandledRejection", (e) => {
  console.log("unhandledRejection", e.message || e);
  process.exit(1);
});

Promise.reject("promise rejected!");

// Se o Promise.reject estiver dentro de um outro contexto, ele cai no unhandledRejection
setTimeout(async () => {
  await Promise.reject("async promise rejected!");
});

// Mas se ele estiver no contexto global, ele cai no uncaughtException
// await Promise.reject("async promise rejected!");

// uncaughtException
setTimeout(() => {
  throwError("erro fora do catch!");
});
