import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Database from './core/data/connections/Database';
import { HttpError } from './errors/HttpErrors';
import path from 'path';
import fs from 'fs';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    async init() {
        this.config();
        this.middlewares();
        this.routers();
        this.errors();
        await this.database();
    }

    start(port: number) {
        this.#express.listen(port, () => {
            console.log(`A aplicação está rodando na porta ${port}...`);
        });
    }

    private config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(cors());
    }

    private middlewares() {
        /* this.#express.use(authMiddleware); */
    }

    private errors() {
        this.#express.use(
            (
                error: HttpError,
                request: Request,
                response: Response,
                next: NextFunction
            ) => {
                return response.status(error.status).json({
                    message: error.message
                });
            }
        );
    }

    private routers() {
        const routesPath = path.resolve(__dirname, 'routes');

        // TODO: refatorar para buscar apenas arquivos que implmentar a interface HttpRouter
        fs.readdirSync(routesPath).forEach((filename) => {
            import(path.resolve(routesPath, filename)).then((file) => {
                const instance = new file.default();
                this.#express.use(instance.init());
            });
        });
    }

    private async database() {
        await Database.getInstance();
    }
}
