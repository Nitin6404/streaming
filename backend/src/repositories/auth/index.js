const { User } = require("../../models/userModel/index");

exports.checkUserExists = async (phoneNumber) => {
  return await User.findOne({ phoneNumber });
};

exports.createUser = async (phoneNumber, username, role) => {
  try {
    let userData = { phoneNumber, username };
    if (role && role !== "student") {
      userData.role = role;
    }
    const user = new User(userData);
    return await user.save();
  } catch (err) {
    console.error("Create user error:", err);
    return null;
  }
};


