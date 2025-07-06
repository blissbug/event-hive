import { Router } from "express";
import getEvents from "../controllers/publicControllers";

const publicRouter = Router();

publicRouter.get('/',getEvents);

export default publicRouter;

