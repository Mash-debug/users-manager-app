const User = require("../models/User");

module.exports = async () => {
    try {
        const users = await User.find({}, {email: 1});
        return users;
    } catch {
        return [];
    }
}