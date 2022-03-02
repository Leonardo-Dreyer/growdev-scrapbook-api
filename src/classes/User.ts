import Messages from "./Messages";

export default class User {
    id: number = 0;
    messages: Messages[] = [];

    constructor(
        public name: string,
        public password: string,
        public repeatPassword: number,
        public logged: boolean
    ) {
        this.id = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
    };
};