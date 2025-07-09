import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import isAdminMiddleware from "../middlewares/isAdminMiddleware";
import { createEventController, deleteEventController, getAllEventsByAdmin, getAllEventsController, getEventController } from "../controllers/eventControllers";

const EventRouter = Router();

EventRouter.get("/all",getAllEventsController);

EventRouter.get("/events/",authMiddleware,isAdminMiddleware,getAllEventsByAdmin);

EventRouter.post("/create",authMiddleware,isAdminMiddleware,createEventController);

EventRouter.get("/:eventId",getEventController);

EventRouter.delete("/:eventId",authMiddleware,isAdminMiddleware,deleteEventController);

export default EventRouter;