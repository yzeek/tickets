import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError ,validateRequest} from '@yzk-tickets/ticketingcore';
import { User } from "../models/User/User";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
    "/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim() 
            .notEmpty()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be at least 6 characters long"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestError("bad username or password");
        }
        const isMatching = await Password.compare(user.password, password);
        if (!isMatching) {
            throw new BadRequestError("bad username or password");
        }

        const userJwt = jwt.sign(
            {
                id: user.id,
                email,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        };
        return res.status(200).send(user);
    }
);

export { router as signinRouter };
