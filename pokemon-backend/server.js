const Hapi = require("@hapi/hapi");
const cors = require("hapi-cors");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  await server.register({
    plugin: cors,
    options: {
      origins: ["*"],
    },
  });

  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  let renameCount = 0;
  const fibonacci = (num) => {
    if (num <= 1) return num;
    return fibonacci(num - 1) + fibonacci(num - 2);
  };

  // REST API to return 50% probability for catching Pokemon
  server.route({
    method: "GET",
    path: "/catch",
    handler: (request, h) => {
      const success = Math.random() < 0.5;
      return { success };
    },
  });

  // REST API to release Pokemon
  server.route({
    method: "GET",
    path: "/release",
    handler: (request, h) => {
      const number = Math.floor(Math.random() * 100);
      return { success: isPrime(number) };
    },
  });

  // REST API to rename Pokemon
  server.route({
    method: "GET",
    path: "/rename",
    handler: (request, h) => {
      renameCount++;
      const newName = `${request.query.name}-${fibonacci(renameCount)}`;
      return { rename: newName };
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
