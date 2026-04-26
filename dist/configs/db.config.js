"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_enum_1 = require("../shared/enums/database.enum");
dotenv_1.default.config();
class DatabaseConfig {
    static getSequelizeConfig() {
        const dialect = process.env.DB_CONNECTION;
        switch (dialect) {
            case database_enum_1.DatabaseEnum.MYSQL:
            case database_enum_1.DatabaseEnum.POSTGRES:
                return Object.assign(Object.assign({}, DatabaseConfig.commonConfig), { dialect });
            default:
                throw new Error('Invalid or unsupported database dialect');
        }
    }
}
DatabaseConfig.commonConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    models: [__dirname + '/../models/**/*.model.{ts,js}'],
    logging: false
};
exports.default = DatabaseConfig;
