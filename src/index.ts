import express, { Request, response, Response } from 'express';
import cors from 'cors';
import { request } from 'http';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('./users', (request: Request, response: Response) => {
    return response.json({
        menssage: 'Olá, mundo'
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API running...');
});      