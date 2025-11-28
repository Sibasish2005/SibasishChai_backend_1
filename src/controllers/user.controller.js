import asyncHandler from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { user, User }  from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user detail from front end
  //validation
  //check if user exist : username, email
  //check for images
  // check for  avtaar
  //upload in cloudinary,avtaar
  //create user object -create entry in db
  //remove password and refreshToken field
  //check for user creation ( null or not )
  //return res

  const { fullName, email, username, password } = req.body;
  console.log("email:",email);
  
//   if(fullName===""){
//     throw new apiError(400,"fullname required")
//   }

if(
    [fullName,email,username,password].some((field)=>
       field?.trim() === "")
){
   throw new apiError(400,"all fields are required") 
}
const existedUser =  User.findOne({
    $or:[{ username },{ email }]
 }) 

 if(existedUser){
    throw new apiError(409,"user already exist ")
 }

 
const avtaarLocalPath = req.files?.avtaar[0]?.path
const coverImageLocalPath =  req.files?.coverImage[0]?.path                     

if(!avtaarLocalPath) {
   throw new apiError(400,"Avtaar is required")
}
 const avtaar = await uploadOnCloudinary(avtaarLocalPath)


if(!coverImageLocalPath) {
   throw new apiError(400,"Avtaar is required")
}

const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avtaar){
    throw new apiError(400,"Avtaar is required")
}
const user = await User.create({
   fullName,
   avtaar:avtaar.url,
   coverImage:coverImage?.url || "",
   email,
   password,
   username:username.toLowerCase(),
})

 const createdUser = await user.findById(user._id).select(
   "-password -refreshToken"
 )
 if(!createdUser){
   throw new apiError(500,"Something went wrong while registering the user.")
 }

return res.status(201).json(
   new ApiResponse(200,createdUser,"user registered successfully ")
);


});

export { registerUser };
