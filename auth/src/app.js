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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const current_user_1 = require("./routes/current-user");
const signout_1 = require("./routes/signout");
const signin_1 = require("./routes/signin");
const signup_1 = require("./routes/signup");
const ticketingcore_1 = require("@yzk-tickets/ticketingcore");
const ticketingcore_2 = require("@yzk-tickets/ticketingcore");
const app = (0, express_1.default)();
exports.app = app;
app.set('trust proxy', true);
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));
/** user routes */
app.use(current_user_1.currentUserRouter);
app.use(signout_1.signoutRouter);
app.use(signin_1.signinRouter);
app.use(signup_1.signupRouter);
app.get('*', () => __awaiter(void 0, void 0, void 0, function* () {
    throw new ticketingcore_2.NotFoundError();
}));
app.use(ticketingcore_1.errorHandler);
