"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Messages_1 = __importDefault(require("./classes/Messages"));
const User_1 = __importDefault(require("./classes/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const users = [];
function validateUser(request, response, next) {
    const { name, password, repeatPassword, logged } = request.body;
    if (!name || name.length < 3 || !password || password.length < 3 || password !== repeatPassword) {
        return response.sendStatus(400).json();
    }
    else {
        if (!users) {
            next();
        }
        else {
            users.find(user => {
                if (user.name === name) {
                    return response.sendStatus(401).json();
                }
                ;
            });
            next();
        }
        ;
    }
    ;
}
;
function validateMessages(request, response, next) {
    const { descrition, detailing } = request.body;
    if (!descrition || !detailing) {
        return response.sendStatus(400).json();
    }
    ;
    next();
}
;
function verifyLog(request, response, next) {
    if (request.user = users.find(user => user.logged === true)) {
        next();
    }
    else {
        return response.sendStatus(401).json();
    }
    ;
}
;
app.post('/users', validateUser, (request, response) => {
    const { name, password, repeatPassword, logged } = request.body;
    const user = new User_1.default(name, parseInt(password), parseInt(repeatPassword), logged);
    users.push(user);
    return response.status(201).json({ message: 'Usário cadastrado com sucesso!' });
});
app.post('/users/messages', verifyLog, validateMessages, (request, response) => {
    const { descrition, detailing } = request.body;
    const message = new Messages_1.default(descrition, detailing);
    request.user.messages.push(message);
    return response.status(201).json({
        id: message.id,
        descrition,
        detailing
    });
});
app.get('/users/messages', verifyLog, (request, response) => {
    const user = request.user;
    return response.status(200).json(user.messages);
});
app.get('/users/messages/:id', (request, response) => {
    const { id } = request.params;
    users.forEach(user => {
        user.messages.find(message => {
            if (message.id === parseInt(id)) {
                return response.status(200).json(message);
            }
            ;
        });
    });
});
app.put('/users/:name/password/:password', (request, response) => {
    const { name, password } = request.params;
    users.find(user => {
        if (user.name === name && user.password === parseInt(password)) {
            user.logged = true;
            return response.sendStatus(201).json();
        }
        ;
    });
    return response.sendStatus(401).json();
});
app.put('/users', verifyLog, (request, response) => {
    const user = request.user;
    user.logged = false;
    return response.sendStatus(201).json();
});
app.put('/users/messages/:id', verifyLog, (request, response) => {
    const { id } = request.params;
    const { descrition, detailing } = request.body;
    const user = request.user;
    user.messages.find(message => {
        if (message.id === parseInt(id)) {
            message.descrition = descrition;
            message.detailing = detailing;
            return response.status(201).json(message);
        }
        ;
    });
});
app.delete('/users/messages/:id', verifyLog, (request, response) => {
    const { id } = request.params;
    const user = request.user;
    request.user.messages.splice(user.messages.findIndex(message => message.id === parseInt(id)), 1);
    return response.sendStatus(204).json();
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API running on port ${port}.`);
});
