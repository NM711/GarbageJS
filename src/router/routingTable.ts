import RouterTypes from "../../types/router.types"
import GarbageRouter from "./router";

interface AddToTable {
  path?: string,
  routers: GarbageRouter[],
  middlewares: RouterTypes.MiddlewareType[]
};

class RoutingTable {
  private app: RouterTypes.App;

  constructor () {
    this.app = {
      type: "AppRoot",
      routers: new Map(),
      globalMiddlewares: []
    };
  };

  public add({ path, routers, middlewares }: AddToTable) {
    if (!path && routers.length === 0 && middlewares.length > 0) {
      this.app.globalMiddlewares = middlewares;
    } else if (path) {
      // we merge all of the router routes into a single route map;
      const routerRoutes: RouterTypes.RouteMap = new Map();

      for (const router of routers) {
        const routes = router.retrieve;

        for (const [k, v] of routes) {
          routerRoutes.set(k, v);
        };
      };

      this.app.routers.set(path, {
        type: "AppRouter",
        routerMiddlewares: middlewares,
        routes: routerRoutes
      });
    };
  };

  public get retrieve(): RouterTypes.App {
    console.log(this.app);
    console.log(this.app.routers)
    return this.app;
  };
};

export default RoutingTable;