import EventHour from "../../Models/EventHour.model";


export default defineEventHandler(async (event) => {
    const events = await EventHour.find().populate("user");
    return events;
});