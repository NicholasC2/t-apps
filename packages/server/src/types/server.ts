import { Request, Response, NextFunction } from "express";

export namespace ServerTypes {
    export interface Options {
        port: number;
    }

    export enum Method {
        GET = "GET",
        POST = "POST",
        PUT = "PUT",
        PATCH = "PATCH",
        DELETE = "DELETE",
    }

    export type Handler = (
        req: Request,
        res: Response,
    ) => Promise<void> | void;

    export type Middleware = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<void> | void;

    export interface Instance {
        options: Options;

        route(
            method: Method,
            endpoint: string,
            handler: Handler
        ): void;

        route(
            method: Method,
            endpoint: string,
            middleware: Middleware,
            handler: Handler
        ): void;

        listen(): Promise<void>;
    }
}