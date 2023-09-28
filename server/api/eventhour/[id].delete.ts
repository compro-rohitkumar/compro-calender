import EventHour from "../../Models/EventHour.model";
import User from "../../Models/User.model";


export default defineEventHandler(async (event) => {
    if(!event.context.params){
        return "no params";
    }
    const param = event.context.params.id;
    const deleteEvent = EventHour.findByIdAndRemove(param);
    if(deleteEvent){
      const {user} = deleteEvent;
      const updateUser = await User.findById(user);
        if(updateUser){
            updateUser.Events.pull(deleteEvent._id);
            await updateUser.save();
        }
        return deleteEvent;
    }else{
        return new Error('Event not found');
    }

})