import { 
  Request, Response, NextFunction, 
  RequestHandler, ErrorRequestHandler
} from "express";
/**
 * HttpError Definition
 */
export interface HttpError extends Error {
  status?: number;
}
/**
 * HttpResponse 
 */
export interface HttpResponse<T> {
  code: number;
  message: string;  
  href?: string;
  next?: string;
  prev?: string;
  offset?: number;
  limit?: number;
  count?: number;
  data?: T | Array<T>;
}
/**
 * XResponse
 */
export interface XResponse<T> extends Response {
  data?: T | Array<T>;
  error?: HttpError;
}
/**
 * query options
 */
export interface QueryOption {
  offset?: number;
  limit?:  number;
}
/**
 * Wrap
 */
export function wrap<T>(option?: QueryOption): (RequestHandler | ErrorRequestHandler)[] {
  return [
    (req: Request, res: XResponse<T>, next: NextFunction): any => {
      if(res.data) {
        const data: T | Array<T> = res.data;
        const opt = { offset: option.offset || 0, limit: option.limit || 25 };
        res.json({ 
          code: 200, 
          message: "success",
          href:   "".concat(req.protocol, "://", req.hostname, req.baseUrl, req.url),
          offset: Array.isArray(data) ? parseInt(req.query.offset || opt.offset) : undefined,
          limit:  Array.isArray(data) ? parseInt(req.query.limit || opt.limit) : undefined,
          count:  Array.isArray(data) ? data.length : undefined,
          data: data 
        });
      } else {
        next(res.error);
      }
  }, (req: Request, res: XResponse<T>, next: NextFunction): any => {
      res.error = { status: 404, message: "Not Found", name: "NotFound" };
      next(res.error);
  }, (err: HttpError, req: Request, res: XResponse<T>, next: NextFunction): any => {
      if(res.error) {
        res.json({
          code: res.error.status || 500,
          message: res.error.message || "Internal Error"
        });
      } else if(err) {
        res.json({
          code: err.status || 500,
          message: err.message || "Internal Error"
        });
      }
  }];
}
 