"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, password, repeatPassword, logged) {
        this.name = name;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.logged = logged;
        this.id = 0;
        this.messages = [];
        this.id = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
    }
    ;
}
exports.default = User;
;
