import UserModel from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";


export const userRegister = asyncHandler(async(req , res) => {
    const { email , password ,  firstname ,lastname} = req.body;
    

    //  check all fields are filled
    if(
        [firstname , lastname , email , password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(404 , " Please fill in all fields");
    }


    const existingUser = await UserModel.findOne({ $or :[{email }] });
    if(existingUser){
        res.status(201).json(new ApiResponse(404, null , "User already exists"));
    }

    const user = await UserModel.create({ email , password ,  firstname ,lastname});

    return res.status(201).json( new ApiResponse(200, user , "user register success full ") );
    
    

})


