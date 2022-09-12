import mongoose from "mongoose";
import {Password} from "../services/password";

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

// Hashed password before save
userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Just for typescript check
userSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };