import user from "../../Models/User.model";
import {validateUser} from "../../validation";
import {v4 as uuidv4} from "uuid";
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {error} = validateUser(body);
    if(error){
        return error.details[0].message;
    }
    const {name, email, password} = body;
    const id =  uuidv4();
    const exsistuser =await user.findOne({email});
    if(exsistuser){
        return "user already exsist with this email";
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newuser = new user({
        name,
        email,
        password: passwordHash,
        id
    })
    await newuser.save();
    return newuser;
});