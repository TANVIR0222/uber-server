import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/AsyncHandler.js";
import UserModel from "../model/user.model.js";


// verify Token
export const verifyToken = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer" , "");        
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token , process.env.JWT_ACCESS_SECRET_KEY);
    
        const user = await UserModel.findById(decodedToken._id)
        console.log(user);
        
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized request");
    }
})