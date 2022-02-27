export default class Messages {
    id: number = 0;

    constructor(
        public descrition: string,
        public detailing: string,
    ) {
        this.id = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
    };
};