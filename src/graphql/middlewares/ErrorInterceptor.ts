import { MiddlewareFn } from "type-graphql";
import { isExternalError } from "../../errors";
import { InternalError } from "../../errors/InternalError";

export const ErrorInterceptor: MiddlewareFn<any> = async ({ context, info }, next) => {
  try {
    return await next();
  } catch (err) {
    if (isExternalError(err)) {
      throw err;
    } else {
      // intercept and hide internal error
      throw new InternalError('Internal Error');
    }
  }
};