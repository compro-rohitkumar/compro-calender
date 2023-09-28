import EventHour from "../../Models/EventHour.model";
import User from "../../Models/User.model";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, description, startDate, endDate, user, id, startTime, endTime } = body;
    const eventUser = await User.findById(user);
    if (!eventUser) return new Error('User not found');
    const newEventHour = new EventHour({
        name,
        description,
        startDate,
        endDate,
        EventId: id,
        user,
        startTime,
        endTime
    })
    const savedEventHour = await newEventHour.save();
    eventUser.Events.push(savedEventHour._id);
    await eventUser.save();
    return savedEventHour.populate('user');
})