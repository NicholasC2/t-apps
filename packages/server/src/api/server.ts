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
            this.app.routes[method.toLowerCase()](
                endpoint,
                async (req: Request, res: Response) => {
                    const response = await handler({
                        params: req.params,
                        body: req.body,
                        headers: req.headers as Record<string, string>
                    });

                    res.json(response);
                }
            );
        }

        async listen() {
            this.app.listen(this.options.port);
        }

        constructor(
            private app: Application,
            public options: ServerTypes.Options
        ) {}
    }

    export function createServer(options: ServerTypes.Options): ServerTypes.Instance {
        const app = express();
        
        return new Instance(app, options);
    }
}