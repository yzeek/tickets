import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from '@yzk-tickets/ticketingcore';
import { User } from "../models/User/User";
const router = express.Router();

router.post(
    "/api/users/signup",
    [body("email").isEmail().withMessage("email must be valid!!!!"),
    body("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("password must be between 4 and 20 characters long"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const exsistingUser = await User.findOne({ email });
        if (exsistingUser) {
            throw new BadRequestError("Email already exists");

        }
        const user = User.build({
            email,
            password,
        });
        await user.save();
        // generate jwt and store on session object
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
        return res.status(201).send(user);
    }
);

export { router as signupRouter };
