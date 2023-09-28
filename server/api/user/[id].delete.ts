import user from "../../Models/User.model";

export default defineEventHandler(async (event) => {
    if(!event.context.params){
        return "no params";
    }
    const param = event.context.params.id;
    const deleteuser = await user.findOneAndDelete({id: param})

    return deleteuser;
});