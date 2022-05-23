"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPassword = exports.invalidUser = exports.invalidField = exports.defaultErrorMessage = void 0;
exports.defaultErrorMessage = 'Ocorreu um erro, tente novamente mais tarde!';
const invalidField = (field) => `${field} inválido!`;
exports.invalidField = invalidField;
exports.invalidUser = 'Usuário inválido!';
exports.invalidPassword = 'Senha incorreta!';
