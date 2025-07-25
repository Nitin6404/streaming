const { User } = require('../../models/userModel/index');

exports.checkUserExists = async (phoneNumber) => {
  return await User.findOne({ phoneNumber });
};

exports.createUser = async (phoneNumber, username) => {
  try {
    const user = new User({ phoneNumber, username });
    return await user.save();
  } catch (err) {
    console.error('Create user error:', err);
    return null;
  }
};
