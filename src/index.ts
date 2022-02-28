import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import Messages from './classes/Messages';
import User from './classes/User';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const users: User[] = [];

function validateUser(request: any, response: any, next: NextFunction) {
    const { name, password, repeatPassword, logged } = request.body;
    if (!name || name.length < 3 || !password || password.length < 3 || password !== repeatPassword) {
        return response.sendStatus(400).json();
    } else {
        if (!users) {
            next();
        } else {
            users.find(user => {
                if (user.name === name) {
                    return response.sendStatus(400).json();
                };
            })
            next();
        };
    };
};

function validateMessages(request: any, response: any, next: NextFunction) {
    const { descrition, detailing } = request.body;

    if (!descrition || !detailing) {
        return response.status(400).json()
    };
    next();
};

function verifyLog(request: Request, response: Response, next: NextFunction) {
    if (request.user = users.find(user => user.logged === true)) {
        next();
    } else {
        return response.status(404).json();
    };
};

app.post('/users', validateUser, (request: Request, response: Response) => {
    const { name, password, repeatPassword, logged } = request.body;
    const user = new User(
        name,
        parseInt(password),
        parseInt(repeatPassword),
        logged
    );
    users.push(user);
    return response.status(201).json({ message: 'Usário cadastrado com sucesso!' });
});

app.post('/users/messages', verifyLog, validateMessages, (request: Request, response: Response) => {
    const { descrition, detailing } = request.body;
    const message = new Messages(descrition, detailing);
    request.user.messages.push(message);
    return response.status(201).json({
        id: message.id,
        descrition,
        detailing
    });
});

app.get('/users/messages', verifyLog, (request: Request, response: Response) => {
    const user: User = request.user;
    return response.json(user.messages)
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

app.put('/users/:name/password/:password', (request: Request, response: Response) => {
    const { name, password } = request.params;
    users.find(user => {
        if (user.name === name && user.password === parseInt(password)) {
            user.logged = true;
            return response.status(202).json();
        };
    });
    return response.status(404).json();
});

app.put('/users', verifyLog, (request: Request, response: Response) => {
    const user: User = request.user;
    user.logged = false;
    return response.status(202).json();
});

app.put('/users/messages/:id', verifyLog, (request: Request, response: Response) => {
    const { id } = request.params;
    const { descrition, detailing } = request.body;
    const user: User = request.user;
    user.messages.find(message => {
        if (message.id === parseInt(id)) {
            message.descrition = descrition;
            message.detailing = detailing;
            return response.json(message);
        };
    });
});

app.delete('/users/messages/:id', verifyLog, (request: Request, response: Response) => {
    const { id } = request.params;
    const user: User = request.user;
    request.user.messages.splice(user.messages.findIndex(message => message.id === parseInt(id)), 1);    
    return response.status(204).json();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API running on port ${port}.`);
});  