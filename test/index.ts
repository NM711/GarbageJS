import GarbageServer from "../src/runtime/server";
import type RouterTypes from "../types/router.types";

const app = new GarbageServer();

const myMiddleware1: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Im 1");
  
  next();
};

const myMiddleware2: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Im 2");
};

const myMiddleware3: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Im 3");
};

app.get("/hello", [myMiddleware1, myMiddleware2, myMiddleware3], (req, res) => {
  console.log("Hello World! From the /hello route!")
  res.write("Hello");
});

app.listen(3000);
