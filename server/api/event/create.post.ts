import Event from '../../Models/Event.model'
import  User from '../../Models/User.model'
import { validateEvent } from '../../validation'
import { v4 as uuidv4 } from 'uuid';
export default defineEventHandler(async (event) => {
    //get data from request body
    const body = await readBody(event);

    const { name, description, startDate, endDate,user,id } = body;
    const eventUser =await  User.findById(user);
   if(!eventUser) return new Error('User not found');
    // const { error } = validateEvent(body);
    // if (error) {
    //     return error.details[0].message;
    // }
    //create new event
    const newEvent = new Event({
        name,
        description,
        startDate,
        endDate,
        EventId:id,
        user
    })

   const savedEvent = await newEvent.save();
    eventUser.Events.push(savedEvent._id);
    await eventUser.save();
   return savedEvent.populate('user');
    



})