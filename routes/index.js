const router = require("express").Router();
const { register, users, login, logout } = require("./config/routesPaths");

// Routes
router.get("/", (req, res) => {
    return res.redirect('login');
})
router.use("/", require(`.${register}`));
router.use("/", require(`.${users}`));
router.use("/", require(`.${login}`));
router.use("/", require(`.${logout}`));

module.exports = router;