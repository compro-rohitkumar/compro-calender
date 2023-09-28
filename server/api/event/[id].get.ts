import Event from '../../Models/Event.model'
import { validateEvent } from '../../validation'

export default defineEventHandler(async (event) => {
    if(!event.context.params){
        return "no params";
    }
    const param = event.context.params.id;
    const updateevent = await Event.findById(param).populate("user");
    return updateevent;

})