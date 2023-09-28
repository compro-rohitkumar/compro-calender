import user from "../../Models/User.model";

export default defineEventHandler(async (event) => {
    return await user.find();
})