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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const password_1 = require("../../services/password");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    // versionKey: false
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.password;
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
userSchema.statics.build = (attrs) => {
    return new User(attrs);
};
userSchema.pre('save', function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const hased = yield password_1.Password.toHash(this.get('password'));
            this.set('password', hased);
        }
        done();
    });
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
