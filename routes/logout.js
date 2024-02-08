const router = require("express").Router();
const { logout } = require("./config/routesPaths");

// Déconnexion
router.get(logout, async (req, res) => {
    if(req.session) {
        req.session.destroy(() => {
            res.redirect('login');
        })
        return;
    }
    return res.redirect('login');
});


module.exports = router;