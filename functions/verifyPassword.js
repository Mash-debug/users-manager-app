const bcrypt = require("bcrypt");

module.exports = async (password, hashPassword) => {
    const isPasswordCorrect = await bcrypt.compare(password, hashPassword);
    return isPasswordCorrect;
}
