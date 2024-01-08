import http from "node:http"
import GarbageRouter from "./router/router";
import RoutingTable from "./router/routingTable";
import RouterTypes from "../types/router.types";
import type AppTypes from "../types/app.types";


class GarbageApp {
  private server: http.Server;
  private req: http.IncomingMessage;
  private res: http.ServerResponse;
  private table: RoutingTable; 

  private currentMiddlewares: RouterTypes.MiddlewareType[];

  constructor () {
    this.server = http.createServer((req, res) => {
      this.req = req;
      this.res = res;
    });
    this.currentMiddlewares = [];
    this.table = new RoutingTable();
  };

  public set updateMiddlewareStack(middlewares: RouterTypes.MiddlewareType[]) {
    this.currentMiddlewares.push(...middlewares);
  };

  public next() {
    if (this.currentMiddlewares.length > 0) {
      const middleware = this.currentMiddlewares.shift();
        if (middleware) {
          middleware(this.req, this.res, this.next.bind(this));
        };
    };
  };

  /**
   * @method router
   * @returns GarbageRoute
   * @description
   * Initializes a new instance of the router, this way we can support router scope, where we can create a hiearchy of 
   * route levels.
  */

  public router() {
    return new GarbageRouter();
  };

  public use ({ path, middlewares, routers }: AppTypes.MounterParams1): void;
  public use({ middlewares, routers }: AppTypes.MounterParams2): void;
  public use({ routers }: AppTypes.MounterParams3): void;
  public use({ middlewares }: AppTypes.MounterParams4): void;
  public use ({ path, middlewares, routers }: AppTypes.Mounter) {
    this.table.add({ path, routers: routers || [], middlewares: middlewares || [] })
  };

  private execute () {
    const app = this.table.retrieve;

    this.server.on("request", (req, res) => {
      this.updateMiddlewareStack = app.globalMiddlewares;
      console.time("Route-Match-Performance");
      const path = req.url || "";

      const splitUrl = path.split("/");
      
      let formed: string = "";
      let router: RouterTypes.Router | null = null;
      let routerFound: boolean = false;

      while (splitUrl.length > 0) {
        const url = splitUrl.shift();

        if (url && !url.startsWith("/")) {
          formed += `/${url}`
        } else if (url) {
          formed += url
        };

        if (!routerFound && app.routers.has(formed)) {
          router = app.routers.get(formed) as RouterTypes.Router;
          this.updateMiddlewareStack = router.routerMiddlewares;
          formed = "";
          routerFound = true;  
        };

        if (routerFound && router && router.routes.has(formed)) {
          const route = router.routes.get(formed) as RouterTypes.Route;

          const method = this.req.method as RouterTypes.HttpMethod;

            if (route.body.has(method)) {
              const middlewares = route.body.get(method) as RouterTypes.RouteBody;

              this.updateMiddlewareStack = middlewares;
              this.next();
            };
        };
      };
      console.timeEnd("Route-Match-Performance");
    });
  };

  public listen(port: number, message: string = `Running http server on ${port}`) {
    this.execute();
    this.server.listen(port, () => {
      console.log(message);
    });
  };
};

export default GarbageApp;
