import mongoose from "mongoose";

// For attributes
interface UserAttrs{
    email: string,
    password: string
}
// For model structure
interface UserModel extends mongoose.Model<any>{
    build(attrs: UserAttrs): UserDoc;
}
// Properties of user model
interface UserDoc extends mongoose.Document{
    email: string,
    password: string
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Just for typescript check
userSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };