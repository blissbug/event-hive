import { Router } from "express";
import getEvents from "../controllers/publicControllers";

const PublicRouter = Router();

PublicRouter.get('/',getEvents);

export default PublicRouter;

