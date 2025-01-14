import { Router } from "express";
import { getUserProfile, logoutUser, userLogin, userRegister } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();
router.route('/register').post(userRegister)
router.route('/profile/:id').get(getUserProfile)
router.route('/login').post( userLogin)
router.route('/logout').post( logoutUser)


export default router;  //export the router to use it in other files