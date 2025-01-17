import { Router } from "express";
import { logoutUser, userLogin, userRegister } from "../controller/user.controller.js";

const router = Router();
router.route('/register').post(userRegister)
router.route('/login').post( userLogin)
router.route('/logout').post( logoutUser)


export default router;  //export the router to use it in other files