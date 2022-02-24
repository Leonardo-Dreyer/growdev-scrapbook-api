import express, { Request, Response } from 'express';
import cors from 'cors';
import { request } from 'http';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('./users', (request: Request, response: Response) => {
    const {name, password, repeatPassword} = request.body;

    
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API running...');
});      