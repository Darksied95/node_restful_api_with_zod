import mongoose from "mongoose";
import bcrypt from "bcrypt"

export interface UserInput {
    email: string,
    name: string,
    password: string,
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    let user = this as UserDocument

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
    }
    next()

})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const user = this as UserDocument
    return bcrypt.compare(password, user.password).catch(e => false)
}

const UserModel = mongoose.model("User", userSchema)

export default UserModel