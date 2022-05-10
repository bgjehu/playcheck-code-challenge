import { DEBUG } from "../../env";
import { ErrorInterceptor } from "./ErrorInterceptor";

export const globalMiddlewares = DEBUG ? [] : [ErrorInterceptor];