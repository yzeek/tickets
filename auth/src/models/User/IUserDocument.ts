import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
    email: string;
    password: string;
}
