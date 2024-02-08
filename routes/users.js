const router = require("express").Router();
const { users: usersPath } = require("./config/routesPaths");
const isUserAuthentified = require("../functions/isUserAuthentified");
const getAllUsers = require("../functions/getAllUsers");


// Page - Route authentifiée
router.get(usersPath, isUserAuthentified, async (req, res) => {
    const allUsers = await getAllUsers();
    return res.render('users', {users: allUsers});
});


module.exports = router;