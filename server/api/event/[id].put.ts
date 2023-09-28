import Event from '../../Models/Event.model'
import User from '../../Models/User.model'
import { validateEvent } from '../../validation'

export default defineEventHandler(async (event) => {
    if(!event.context.params){
        return "no params";
    }
    const param = event.context.params.id;
    const body = await readBody(event);
    const { name, description, startDate, endDate,user, id } = body;
    const updateEvent =await  Event.findById(param);
    if(!updateEvent) return new Error('Event not found');
    if(updateEvent.user!=user){
        const findUser = await User.findById(updateEvent.user);
        if(findUser){
            findUser.Events.pull(updateEvent._id);
            await findUser.save();
        }
        const userEvent = await User.findById(user);
        if(userEvent){
            userEvent.Events.push(updateEvent._id);
            await userEvent.save();
        }
    }
    updateEvent.name=name;
    updateEvent.description=description;
    updateEvent.startDate=startDate;
    updateEvent.endDate=endDate;
    updateEvent.EventId=id;
    updateEvent.user=user;
    await updateEvent.save();
    return await updateEvent.populate('user');

})