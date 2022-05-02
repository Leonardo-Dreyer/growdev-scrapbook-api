"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Messages {
    constructor(descrition, detailing) {
        this.descrition = descrition;
        this.detailing = detailing;
        this.id = 0;
        this.id = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
    }
    ;
}
exports.default = Messages;
;
