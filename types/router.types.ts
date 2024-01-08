import http from "node:http";

namespace RouterTypes {

  export type HttpMethod = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";
  
  export type Next = () => MiddlewareType | void | Promise<void | MiddlewareType>;

  export type ControllerType<T> = (req: http.IncomingMessage, res: http.ServerResponse, next: Next) => T;

  export type HandlerType = ControllerType<void | Promise<void>>

  export type MiddlewareType = ControllerType<Next | void | Promise<Next | void>>;
  
  export type RouteBody = (MiddlewareType | HandlerType)[];

  export type RouteBodyMap = Map<HttpMethod, RouteBody>;

  export type RouteMap = Map<string, Route>;

  // body is arr because routes can have different methods with the same name that run different funcionality
  export type Route = {
    type: "AppRoute";
    body: RouteBodyMap;
  };

  export type Router = {
    type: "AppRouter";
    routerMiddlewares: MiddlewareType[];
    routes: RouteMap; 
  };

  export type RouterMap = Map<string, Router>

  export interface App {
    type: "AppRoot";
    routers: RouterMap;
    globalMiddlewares: MiddlewareType[];
  };

  export interface CreateRouteBody {
    path: string;
    method: RouterTypes.HttpMethod;
    middlewares: RouterTypes.MiddlewareType[];
    handler: RouterTypes.HandlerType;
  };
};

export default RouterTypes;
