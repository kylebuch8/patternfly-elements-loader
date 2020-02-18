"use strict";

const Hapi = require("@hapi/hapi");
const concat = require("concat");
const browserify = require("browserify");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      const folderPrefix = "./node_modules/@patternfly";
      const elementPrefix = "pfe-";
      const suffix = ".umd.min.js";
      const requestedElements = request.query.elements.split(",");
      const elementsToLoad = requestedElements.map(element => {
        return `${folderPrefix}/${elementPrefix}${element}/${elementPrefix}${element}${suffix}`;
      });

      const promise = new Promise((resolve, reject) => {
        browserify(elementsToLoad).bundle((err, buffer) => {
          if (err) {
            reject(err);
          }

          resolve(h.response(buffer).type("application/javascript"));
        })
      });

      return promise;
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
