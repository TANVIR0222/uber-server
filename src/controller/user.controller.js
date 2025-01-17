import UserModel from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

// cookies optins 
const options = {
    httpOnly: true,
    secure : true,
}

// user register
export const userRegister = asyncHandler(async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    //  check all fields are filled
    if (
      [firstname, lastname, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(404, " Please fill in all fields");
    }

    // check if email is all ready in use
    const existingUser = await UserModel.findOne({ $or: [{ email }] });
    if (existingUser) {
      res.status(201).json(new ApiResponse(404, null, "User already exists"));
    }

    // create new user
    const user = await UserModel.create({
      email,
      password,
      firstname,
      lastname,
    });

    // cheack if user is created
    const cretateUser = await UserModel.findOne({ _id: user._id });
    if (!cretateUser) {
      return res
        .status(401)
        .json(new ApiResponse(401, user, " User not found! try again"));
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
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email , password);
  

  if (![email ||  password]) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, " Please fill in all fields"));
  }

  const user = await UserModel.findOne({email}).select('+password')  
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
export const logoutUser = asyncHandler(async (req,res) => {

    const userid = req.userId;

    
    res.status(200)
    .clearCookie("accessToken"  , options)
    .json(new ApiResponse(200, {} , "user logout success full "));

})