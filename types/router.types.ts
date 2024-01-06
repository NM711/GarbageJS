import http from "node:http";

namespace RouterTypes {

  export type HttpMethod = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";
  
  export type Next = () => MiddlewareType | void | Promise<void | MiddlewareType>;

  export type ControllerType<T> = (req: http.IncomingMessage, res: http.ServerResponse, next: Next) => T;

  export type HandlerType = ControllerType<void | Promise<void>>

  export type MiddlewareType = ControllerType<Next | void | Promise<Next | void>>;
  
  export interface RouteBody {
    methods: Map<HttpMethod, MiddlewareType[]>;
    handler: HandlerType | null;
  };

  export type Path = string;

  export type Routes = Map<Path, RouteBody>;
};

export default RouterTypes;
