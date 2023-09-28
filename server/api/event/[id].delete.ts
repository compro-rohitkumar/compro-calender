import Event from '../../Models/Event.model'
import  User from '../../Models/User.model'
import { validateEvent } from '../../validation'

export default defineEventHandler(async (event) => {
    // console.log(event.context.params)
    if(!event.context||!event.context.params){
        return "no params";
    }
    const param = event.context.params.id;
    const updateevent = await Event.findByIdAndDelete(param);
    if(updateevent){
        updateevent.populate('user');
        const {user} = updateevent;
        const userupdate = await User.findById(user);
        if(userupdate){
            userupdate.Events.pull(updateevent._id);
            await userupdate.save();
        }
    }
    return updateevent;
})