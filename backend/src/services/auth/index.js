//services/auth/index.js
const { checkUserExists, createUser, checkUserUsernameExists, getAllUser, deleteExistingUser, updateExistingUser } = require('../../repositories/auth');
const { OTP } = require('../../constants/otp/index');
const jwt = require('jsonwebtoken');

/**
 * Registration handler — registers new user or logs in existing one
 */
exports.registerUser = async (phoneNumber, otp, role,username) => {
  const isOtpValid = otp == OTP;
  if (!isOtpValid) {
    return {
      statusCode: 401,
      message: 'Invalid OTP',
      data: null,
    };
  }

  let user = await checkUserExists(phoneNumber);



  if (user) {
      return {
        statusCode: 400,
        message: 'Mobile no is registered',
        data: null,
      };
    }

    user= await checkUserUsernameExists(username);

    if(user){
      return {
        statusCode:409,
        message:"Username is already taken ",
        data:null
      }
    }

      

    user = await createUser(phoneNumber, username,role);
    if (!user) {
      return {
        statusCode: 500,
        message: 'Failed to create user',
        data: null,
      };
    }
    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET);
    
    const statusCode = user.createdAt === user.updatedAt ? 201 : 200;
    
    return {
      statusCode,
      message: statusCode === 201 ? 'User registered successfully' : 'User logged in successfully',
      data: {
        user,
        token,
      }}
}

  


/**
 * Login handler — only allows existing users to log in
 */
exports.loginUser = async (phoneNumber, otp) => {
  const isOtpValid = otp == OTP;
  if (!isOtpValid) {
    return {
      statusCode: 401,
      message: 'Invalid OTP',
      data: null,
    };
  }

  const user = await checkUserExists(phoneNumber);

  if (!user) {
    return {
      statusCode: 404,
      message: 'User not found. Please register first.',
      data: null,
    };
  }

  const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET);

  return {
    statusCode: 200,
    message: 'Login successful',
    data: {
      user,
      token,
    },
  };
};


exports.getUsers = async(phoneNumber) =>{
  if(phoneNumber){
    const user = await checkUserExists(phoneNumber);

    if (!user) {
    return {
      statusCode: 404,
      message: 'User not found.',
      data: null,
    };
  }

  
    return {
      statusCode: 200,
      message: 'User founded!',
      data: user,
    };
  }else{
    const users = await getAllUser();

    if(!users){
      return {
      statusCode: 404,
      message: 'Users not found',
      data: null,
    }
    }
    return {
      data:users,
      message:"All Users searched",
      statusCode:200
    }
  }


}


exports.deleteUser = async phoneNumber =>{
  if(!phoneNumber){
    return {
      data:null,
      message:"Required fields are missing!",
      statusCode:400
    }
  }

  const user = await deleteExistingUser(phoneNumber);

  if(!user){
    return {
      data:null,
      message:"User doesnt Exist",
      statusCode:404
    }
  }

  return {
    data:user,
    message:"User deleted!",
    statusCode:200
  }
}

exports.updateUser = async (phoneNumber,updatedData)=>{
  if(!phoneNumber||!updatedData){
    return {
      data:null,
      message:"Required fields are missing",
      statusCode:400
    }
  }

  let allowUpdates = {};

  if(updatedData.username) allowUpdates.username= updatedData.username;
  if(updatedData.phoneNumber) allowUpdates.phoneNumber = updatedData.phoneNumber

// i removed the role stuff coz once a account is made it will have the same role 
  const user = await updateExistingUser(phoneNumber,allowUpdates);

  if(!user){
    return {
      statusCode: 404,
      message: 'Users not found',
      data: null,
    }
  }

  return {
    data:null,
    message:"User updated!",
    statusCode:200
  }


}