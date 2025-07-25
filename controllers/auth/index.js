const { registerUser, loginUser } = require('../../services/auth/index');
const ApiResponse = require('../../utils/apiResponse');
const { asyncHandler } = require('../../utils/asyncHandler/index');

exports.handleUserRegister = asyncHandler(async (req, res) => {
  const { phoneNumber,otp, username } = req.body;

  const result = await registerUser(phoneNumber,otp, username);
  const { message, data, statusCode = 200 } = result;

  return res.status(200).json(new ApiResponse(statusCode, data, message));
});


exports.handleUserLogin = asyncHandler(async(req,res)=>{
  const {phoneNumber,otp} = req.body;

  const result = await loginUser(phoneNumber,otp);

  const { message, data, statusCode = 200 } = result;

  return res.status(200).json(new ApiResponse(statusCode,data,message));
})
