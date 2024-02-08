const router = require("express").Router();
const verifyPassword = require("../functions/verifyPassword");
const userAlreadyExists = require("../functions/userAlreadyExists");
const { login } = require("./config/routesPaths");
const { errorLogin, errorUserDoesNotExist, errorEmptyField } = require("./config/strings");

// Page
router.get(login, (req, res) => {
    res.render('login');
});

// Api
router.post(login, async (req, res) => {
    const { email, password } = req.body;
    if(email && password) {
       // Vérifier la combinaision (email, password)
       const user = await userAlreadyExists(email);

       if(user) {
        const isPasswordCorrect = await verifyPassword(password, user.password);

        if(isPasswordCorrect) {
            // Créer la session et rediriger vers la page 'users'
            req.session.isAuth = true;
            req.session.email = email;
            return res.redirect('users');
        } else {
            return res.render('login', {errorMessage: errorLogin});
        }

       } else {
        return res.render('login', {errorMessage: errorUserDoesNotExist});
       }
       
    } else {
        res.render('login', {errorMessage: errorEmptyField});
    }
});

module.exports = router;
