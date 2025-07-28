const { checkUserExists, createUser } = require('../../repositories/auth');
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

  if (!user) {
    if (!username) {
      return {
        statusCode: 400,
        message: 'Username is required for new users',
        data: null,
      };
    }

    if(user){
      if(phoneNumber==user.phoneNumber){
        return {
          statusCode: 409,
        message: 'id already exists',
        data: null,
        }
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
  }

  const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET);

  const statusCode = user.createdAt === user.updatedAt ? 201 : 200;

  return {
    statusCode,
    message: statusCode === 201 ? 'User registered successfully' : 'User logged in successfully',
    data: {
      user,
      token,
    },
  };
};

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
