import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import isAdminMiddleware from "../middlewares/isAdminMiddleware";
import { createEventController, deleteEventController, getAllEventsByAdmin, getAllEventsController, getEventController } from "../controllers/eventControllers";

const eventRouter = Router();

eventRouter.get("/all",getAllEventsController);

eventRouter.get("/events/",authMiddleware,isAdminMiddleware,getAllEventsByAdmin);

eventRouter.post("/create",authMiddleware,isAdminMiddleware,createEventController);

eventRouter.get("/:eventId",getEventController);

eventRouter.delete("/:eventId",authMiddleware,isAdminMiddleware,deleteEventController);

export default eventRouter;