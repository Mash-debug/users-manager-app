const User = require("../models/User");

module.exports = async (email) => {
    const user = await User.findOne({email});
    if(user) {
        return user;
    } else {
        return false;
    }
}