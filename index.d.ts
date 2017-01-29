/// <reference types="express" />
import { Response, RequestHandler, ErrorRequestHandler } from "express";
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
    limit?: number;
}
/**
 * Wrap
 */
export declare function wrap<T>(option?: QueryOption): (RequestHandler | ErrorRequestHandler)[];
