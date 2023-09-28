import Event from "../../Models/Event.model";

export default defineEventHandler(async (event) => {
  const events = await Event.find().populate("user");
  return events;
});
