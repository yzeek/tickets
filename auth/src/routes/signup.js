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
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ticketingcore_1 = require("@yzk-tickets/ticketingcore");
const User_1 = require("../models/User/User");
const router = express_1.default.Router();
exports.signupRouter = router;
router.post("/api/users/signup", [(0, express_validator_1.body)("email").isEmail().withMessage("email must be valid!!!!"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("password must be between 4 and 20 characters long"),
], ticketingcore_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const exsistingUser = yield User_1.User.findOne({ email });
    if (exsistingUser) {
        throw new ticketingcore_1.BadRequestError("Email already exists");
    }
    const user = User_1.User.build({
        email,
        password,
    });
    yield user.save();
    // generate jwt and store on session object
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email,
    }, process.env.JWT_KEY);
    req.session = {
        jwt: userJwt,
    };
    return res.status(201).send(user);
}));
