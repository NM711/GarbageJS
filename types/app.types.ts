import GarbageRouter from "../src/router/router";
import type RouterTypes from "./router.types";

namespace AppTypes {
  export interface MounterParams1 {
    path: string;
    middlewares: RouterTypes.MiddlewareType[];
    routers: GarbageRouter[];
  };
  
  export interface MounterParams2 {
    middlewares: RouterTypes.MiddlewareType[];
    routers: GarbageRouter[];
  };

  export interface MounterParams3 {
    routers: GarbageRouter[];
  };

  export interface MounterParams4 {
    middlewares: RouterTypes.MiddlewareType[];
  };

  export type Mounter = {
    path?: string,
    middlewares?: RouterTypes.MiddlewareType[],
    routers?: GarbageRouter[]
  }
};

export default AppTypes;