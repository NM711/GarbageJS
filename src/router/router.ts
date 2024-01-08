import type AppTypes from "../../types/app.types";
import type RouterTypes from "../../types/router.types";

/**
 * @class GarbageRouter
 * @description
 * Class used for the initialization of the router, with this you can begin to build out your endpoints.
 * @example
 * const router = new GarbageRouter();
 * 
 * router.get("/hello", [], (req, res) => {
 *   console.log("hello world");
 * });
 */

class GarbageRouter {
  protected routes: RouterTypes.RouteMap;

  constructor () {
    this.routes = new Map();
  };

  /**
   * @method retrieve
   * @description
   * Retrieves all the routes that are a part of the router instance.
   */

  public get retrieve () {
    return this.routes;
  };

  private createRoute (path: string): void {
    this.routes.set(path, {
      type: "AppRoute",
      body: new Map()
    });
  };

  private createBody({ path, method, middlewares, handler }: RouterTypes.CreateRouteBody) {
    if (!this.routes.has(path)) {
      this.createRoute(path);
    };

    const route = this.routes.get(path) as RouterTypes.Route;

    if (!route.body.has(method)) {
      route.body.set(method, [...middlewares, handler]);
    } else {
      throw new Error(`Method Exists on Route ${path}!`)
    };
  };

  public get(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
    this.createBody({
      path,
      method: "GET",
      middlewares,
      handler
    });
  };

  public delete(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
    this.createBody({
      path,
      method: "DELETE",
      middlewares,
      handler
    });
  };
  
  public post(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
    this.createBody({
      path,
      method: "POST",
      middlewares,
      handler
    });
  };

  public put(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
    this.createBody({
      path,
      method: "PUT",
      middlewares,
      handler
    });
  };
   
  public patch(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
    this.createBody({
      path,
      method: "PATCH",
      middlewares,
      handler
    });
  };

};

export default GarbageRouter;