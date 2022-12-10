import mongoose from "mongoose";
import { IUserAttributes } from "./IUserAttributes";
import { IUserDocument } from "./IUserDocument";
import { IUserModel } from "./IUserModel";
import { Password } from "../../services/password";

const userSchema = new mongoose.Schema({
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
            delete ret._id
        }
    }
})
userSchema.statics.build = (attrs: IUserAttributes) => {
    return new User(attrs)
}

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hased = await Password.toHash(this.get('password'))
        this.set('password', hased)
    }
    done()
})

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);


export { User }