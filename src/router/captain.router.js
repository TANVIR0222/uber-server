import { Router } from "express";
import { captainLogin, captainRegister } from "../controller/captain.controller.js";

const router = Router();

router.route('/captain-register').post(captainRegister)
router.route('/captain-login').post(captainLogin)

export default router;  //export the router to use in other files