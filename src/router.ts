import type RouterTypes from "../types/router.types";

class GarbageRouter {

  protected routes: RouterTypes.Routes

  constructor () {
    this.routes = new Map();
  };

  private createRoute(path: string): void {
    this.routes.set(path, {
      methods: new Map(),
      handler: null
    });
  };

  private updateRoute(path: string, method: RouterTypes.HttpMethod, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
    if (!this.routes.has(path)) {
      this.createRoute(path);
    };

    const route = this.routes.get(path) as RouterTypes.RouteBody;  

    if (route.methods.has(method)) {
      throw new Error(`Route "${path}" has more than one method of "${method}"!`);
    };

    // The last middleware in the stack shall be the handler, since the handler is dependant on the middlewares that run or dont run.
    // We dont want the handler running when the middlewares stop suddenly for whatever reason.
    
    middlewares.push(handler);
    route.methods.set(method, middlewares);
  };

   public get(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
     this.updateRoute(path, "GET", middlewares, handler);
   };

   public delete(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
     this.updateRoute(path, "DELETE", middlewares, handler);
   };
   
   public post(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
     this.updateRoute(path, "POST", middlewares, handler);
   };

   public put(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
     this.updateRoute(path, "PUT", middlewares, handler);
   };
   
   public patch(path: string, middlewares: RouterTypes.MiddlewareType[], handler: RouterTypes.HandlerType) {
     this.updateRoute(path, "PATCH", middlewares, handler);
   };

};

export default GarbageRouter;
