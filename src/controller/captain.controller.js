import CaptainModel from "../model/captain.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

// cookies optins 
const options = {
    httpOnly: true,
    secure : true,
}

// user register
export const captainRegister = asyncHandler(async (req, res) => {
    try {
      const { firstname,lastname,email,password,status,color,plate,capacity,vehicleType } = req.body;
  
      //  check all fields are filled
      if (
        [firstname, lastname, email, password , status,color,plate,capacity,vehicleType].some(
          (field) => field?.trim() === ""
        )
      ) {
        throw new ApiError(404, " Please fill in all fields");
      }
  
      // check if email is all ready in use
      const existingUser = await CaptainModel.findOne({ $or: [{ email }] });
      if (existingUser) {
        res.status(201).json(new ApiResponse(404, null, "User already exists"));
      }
  

      const captainData ={
        firstname,
        lastname,
        email,
        password,
        status,
        color,
        plate,
        capacity,
        vehicleType
      }


      // create new user
      const user = await CaptainModel.create(captainData)
  
      // cheack if user is created
      const cretateUser = await CaptainModel.findOne({ _id: user._id });
      if (!cretateUser) {
        return res
          .status(401)
          .json(new ApiResponse(401, null , " User not found! try again"));
      }
  
      return res
        .status(201)
        .json(new ApiResponse(200, cretateUser, "user register success full "));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, error?.message || error));
    }
  });
  

  //  user login
export const captainLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email , password);
    
  
    if (![email ||  password]) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, " Please fill in all fields"));
    }
  
    const user = await CaptainModel.findOne({email}).select('+password')  
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "User not found! try again"));
    }
  
    const isMatchPassword = await user.isPasswordCorrect(password);
    if (!isMatchPassword) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid password! try again"));
      }
  
      const token = await user.generateAccessToken();
  
      res.status(200)
      .cookie("accessToken" , token , options)
  
      res
      .status(200)
      .json(new ApiResponse(200, {id : user._id , token} , "User login successfull"));
      
  
});

//  
export const logouCaptain = asyncHandler(async (req,res) => {

    const userid = req.userId;

    res.status(200)
    .clearCookie("accessToken"  , options)
    .json(new ApiResponse(200, {} , "user logout success full "));

})