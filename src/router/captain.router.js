import { Router } from "express";
import { captainRegister } from "../controller/captain.controller.js";

const router = Router();

router.route('/captain-register').post(captainRegister)

export default router;  //export the router to use in other files