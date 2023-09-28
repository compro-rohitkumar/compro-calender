import user from "../../Models/User.model";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    if(!event.context.params){
        return "No id provided";
    }
    const param = event.context.params.id;
    const updateuser = await user.findOne({id: param})
    if(!updateuser){
        return "User not found";
    }
    const {name, email, password} = event.context.body;
    if(name){
        updateuser.name = name;
    }
    if(email){
        updateuser.email = email;
    }
    if(password){
        const salt = await bcrypt.genSalt(10);
        updateuser.password = await bcrypt.hash(password, salt);

    }
    await updateuser.save();
    return updateuser;
})