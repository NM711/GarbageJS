import http from "node:http"
import GarbageRouter from "../router";
import type RouterTypes from "../../types/router.types";

class GarbageServer extends GarbageRouter {
  private server: http.Server;
  private req: http.IncomingMessage;
  private res: http.ServerResponse;

  public currentMiddlewares: RouterTypes.MiddlewareType[];

  constructor () {
    super();
    this.server = http.createServer((req, res) => {
      this.req = req;
      this.res = res;
    });
    this.currentMiddlewares = [];
  };

  protected setCurrentMiddlewares(middlewares: RouterTypes.MiddlewareType[]) {
    this.currentMiddlewares = middlewares;
  };

  public next() {
    if (this.currentMiddlewares.length > 0) {
      const middleware = this.currentMiddlewares.shift();
        if (middleware) {
          middleware(this.req, this.res, this.next.bind(this));
        };
    };
  };

  private execute () {
    this.server.on("request", (req, res) => {
      const path = req.url || "";
      if (this.routes.has(path)) {
        const route = this.routes.get(path) as RouterTypes.RouteBody;
        const method = req.method as RouterTypes.HttpMethod;
        
          if (route.methods.has(method)) {
            const middlewares = route.methods.get(method) || [];

            this.setCurrentMiddlewares(middlewares);
            this.next();
          };

      }
    });
  };

  public listen(port: number, message: string = `Running http server on ${port}`) {
    this.execute();
    this.server.listen(port, () => {
      console.log(message);
    });
  };
};

export default GarbageServer;
