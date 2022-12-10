import mongoose from "mongoose";
import { IUserAttributes } from "./IUserAttributes";
import { IUserDocument } from "./IUserDocument";

export interface IUserModel extends mongoose.Model<any> {
    build(attrs: IUserAttributes): IUserDocument;
}
