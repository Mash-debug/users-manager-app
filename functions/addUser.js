const bcrypt = require("bcrypt");
const User = require('../models/User');
const salt = 10;

module.exports = async (email, password) => {
    const hash = await bcrypt.hash(password, salt);
    const user = new User({email, password: hash});

    try {
        await user.save();
        return true;
    } catch {
        return false;
    }
    
}