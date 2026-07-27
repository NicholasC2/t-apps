import express from "express";
import type { Application, Request, Response } from "express";

export namespace Server {
    export enum Method {
        GET,
        POST,
        PUT,
        PATCH,
        DELETE
    }

    export type Handler = (req: Request, res: Response)=>{};

    export interface Options {
        port: number;
    }

    class Instance {
        route(method: Method, endpoint: string, handler: Handler) {
            const callback: express.RequestHandler = async (req, res) => {
                await handler(req, res);
            };
            
            switch (method) {
                case Method.GET:
                    this.router.get(endpoint, callback);
                    break;
                case Method.POST:
                    this.router.post(endpoint, callback);
                    break;
                case Method.PUT:
                    this.router.put(endpoint, callback);
                    break;
                case Method.PATCH:
                    this.router.patch(endpoint, callback);
                    break;
                case Method.DELETE:
                    this.router.delete(endpoint, callback);
                    break;
            }
        }

        async listen() {
            this.app.listen(this.options.port);
        }

        constructor(
            private app: Application,
            public options: Options,
            private router = express.Router()
        ) {}
    }

    export function createServer(options: Options): Instance {
        const app = express();
        const router = express.Router();

        app.use(router);

        app.use((req, res) => {
            res.status(404).json({
                error: "Not Found",
            });
        });
        
        return new Instance(app, options, router);
    }
}