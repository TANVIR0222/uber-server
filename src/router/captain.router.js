import { Router } from "express";
import { captainLogin, captainRegister, logouCaptain } from "../controller/captain.controller.js";

const router = Router();

router.route('/captain-register').post(captainRegister)
router.route('/captain-login').post(captainLogin)
router.route('/captain-logout').post(logouCaptain)

export default router;  //export the router to use in other files