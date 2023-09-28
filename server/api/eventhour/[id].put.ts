import EventHour from "../../Models/EventHour.model";
import User from "../../Models/User.model";
export default defineEventHandler(async (event) => {
    if(!event.context.params){
        return "no params";
    }
    const id = event.context.params.id;
    const updateEvent = await EventHour.findById(id);
    if(!updateEvent) return new Error('Event not found');
    const body = await readBody(event);
    const { name, description, startDate, endDate, user, id: EventId, startTime, endTime } = body;
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
    updateEvent.EventId=EventId;
    updateEvent.user=user;
    updateEvent.startTime=startTime;
    updateEvent.endTime=endTime;
    await updateEvent.save();
    return await updateEvent.populate('user');
})