"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRepository = void 0;
const Redis_1 = __importDefault(require("../connections/Redis"));
class CacheRepository {
    constructor() {
        this.redis = Redis_1.default.getInstance();
    }
    async save(key, value) {
        return await this.redis.set(key, JSON.stringify(value));
    }
    async saveExpiration(key, value, ttl) {
        return await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }
    async find(key) {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }
    async delete(key) {
        const result = await this.redis.del(key);
        return result !== 0;
    }
}
exports.CacheRepository = CacheRepository;
