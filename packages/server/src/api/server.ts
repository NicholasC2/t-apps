import { ServerTypes } from "../types/server";
import express from "express";
import type { Application, Request, Response } from "express";

export namespace Server {
    class Instance implements ServerTypes.Instance {
        route(
            method: ServerTypes.Method,
            endpoint: string,
            handler: ServerTypes.Handler
        ) {
            const callback: express.RequestHandler = async (req, res) => {
                await handler(req, res);
            };
            
            switch (method) {
                case ServerTypes.Method.GET:
                    this.router.get(endpoint, callback);
                    break;
                case ServerTypes.Method.POST:
                    this.router.post(endpoint, callback);
                    break;
                case ServerTypes.Method.PUT:
                    this.router.put(endpoint, callback);
                    break;
                case ServerTypes.Method.PATCH:
                    this.router.patch(endpoint, callback);
                    break;
                case ServerTypes.Method.DELETE:
                    this.router.delete(endpoint, callback);
                    break;
            }
        }

        async listen() {
            this.app.listen(this.options.port);
        }

        constructor(
            private app: Application,
            public options: ServerTypes.Options,
            private router = express.Router()
        ) {}
    }

    export function createServer(options: ServerTypes.Options): ServerTypes.Instance {
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