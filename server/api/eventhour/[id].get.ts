import EventHour from "../../Models/EventHour.model";

export default defineEventHandler(async (event) => {
    if(!event.context.params){
        return "no params";
    }
    const id = event.context.params.id;
    const events = await EventHour.findById(id).populate("user");
    return events;
})