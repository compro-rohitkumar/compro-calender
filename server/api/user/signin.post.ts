import user from "../../Models/User.model";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {email, password} = body;
    if(!email || !password){
        return "please enter all fields";
    }
    const User =await user.findOne({email});
    if(!User){
        return "user not found";
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if(!isMatch){
        return "invalid credentials";
    }
    return User;
})