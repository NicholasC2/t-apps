export namespace ServerTypes {
    export interface Options {
        port: number;
    }

    export enum Method {
        GET = "GET",
        POST = "POST",
        PUT = "PUT",
        PATCH = "PATCH",
        DELETE = "DELETE"
    }

    export interface Context {
        params: Record<string, string | string[]>;
        body: unknown;
        headers: Record<string, string>;
    }

    export type Handler = (
        context: Context
    ) => Promise<Response> | Response;

    export interface Instance {
        options: Options

        route(
            method: Method,
            endpoint: string,
            handler: Handler
        ): void;

        listen(): Promise<void>;
    }
}