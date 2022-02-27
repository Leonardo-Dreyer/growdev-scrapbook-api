import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import Messages from './classes/Messages';
import User from './classes/User';
import { request } from 'http';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const users: User[] = [];

const validatUser = function (request: any, response: any, next: NextFunction) {
    const { name, password, repeatPassword, logged } = request.body;
    if (!name || name.length < 3 || !password || password.length < 3 || password !== repeatPassword) {
        return response.sendStatus(400).json();
    } else {
        if (!users) {
            next();
        } else {
            for (const user of users) {
                if (user.name === name) {
                    return response.sendStatus(400).json();
                };
            };
            next();
        };
    };
};

app.post('/users', validatUser, (request: Request, response: Response) => {
    const { name, password, repeatPassword, logged } = request.body;
    const user = new User(
        name,
        parseInt(password),
        parseInt(repeatPassword),
        logged
    );
    users.push(user);
    console.log(users);
    return response.status(201).json({ message: 'Usário cadastrado com sucesso!' });
});

function saveMessage(request: any, response: Response, next: NextFunction) {
    const { descrition, detailing } = request.body;
    users.forEach(user => {
        if (user.logged === true) {
            const message = new Messages(descrition, detailing);
            request.id = message.id;
            user.messages.push(message);
            next();
        };
    });
}

app.post('/users/messages', saveMessage, (request: any, response: Response) => {
    const { descrition, detailing } = request.body;
    return response.status(201).json({
        id: request.id,
        descrition: descrition,
        detailing: detailing
    });
});

function validateLogin(request: Request, response: Response, next: NextFunction) {
    const { name, password } = request.params;
    users.forEach(user => {
        if (user.name === name && user.password === parseInt(password)) {
            user.logged = true;
            next();
        };
    });
    return response.status(404).json();
};

app.get('/users/:name/password/:password', validateLogin, (request: Request, response: Response) => {
    return response.status(202).json();
});

app.get('/users/logout', (request: Request, response: Response) => {
    users.forEach(user => {
        if (user.logged === true) {
            user.logged = false;
            console.log(users);
            return response.status(202).json();
        };
    });
});

app.get('/users/messages', (request: Request, response: Response) => {
    users.forEach(user => {
        if (user.logged === true) {
            return response.json(user.messages)
        };
    });
});

app.get('/users/messages/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    users.forEach(user => {
        user.messages.find(message => {
            if (message.id === parseInt(id)) {
                return response.json(message);
            };
        });
    });
});

app.put('/users/messages/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const { descrition, detailing } = request.body;
    users.forEach(user => {
        if (user.logged === true) {
            user.messages.find(message => {
                if (message.id === parseInt(id)) {
                    message.descrition = descrition;
                    message.detailing = detailing;
                    return response.json(message);
                };
            });
        };
    });
});

app.delete('/users/messages/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    users.forEach(user => {
        if (user.logged === true) {
            const position = user.messages.findIndex(message => message.id === parseInt(id));
            user.messages.splice(position, 1);    
            return response.sendStatus(204).json();
        };
    });
});

app.listen(8080, () => {
    console.log('API running...');
});       