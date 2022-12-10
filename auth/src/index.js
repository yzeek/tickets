"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_KEY)
        throw new Error('JWT_KEY is required');
    try {
        yield mongoose_1.default.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('connected!');
    }
    catch (error) {
        console.error(error);
    }
    app_1.app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
});
initialize();
