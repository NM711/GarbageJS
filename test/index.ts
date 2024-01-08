import GarbageApp from "../src/application";
import type AppTypes from "../types/app.types";
import type RouterTypes from "../types/router.types";

const app = new GarbageApp();

const myMiddleware1: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Im 1");
  
  next();
};

const myMiddleware2: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Im 2");
  next();
};

const myMiddleware3: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Im 3");
  next();
};

const globalMiddleware: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Some very cool global Middleware");
  next();
};

const routerMiddleware: RouterTypes.MiddlewareType = (req, res, next) => {
  console.log("Router Middleware");
  next();
};

const router = app.router();

router.get("/hello", [myMiddleware1, myMiddleware2, myMiddleware3], (req, res) => {
  console.log("Hello World! From the /hello route!")
  res.write("Hello");
});

const router2 = app.router();

router2.get("/world", [], (req, res) => {
  console.log("WORLD WORLD WORLD");
})

router2.get("/wtf", [], (req, res) => {
  console.log("Some Random Endpoint!");
})

app.use({ path: "/myPath", middlewares: [routerMiddleware], routers: [router, router2] });
app.use({ path: "/new", middlewares: [myMiddleware1], routers: [router2] })
app.use({ middlewares: [globalMiddleware] });
app.listen(3000);
