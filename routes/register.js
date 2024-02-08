const router = require("express").Router();
const { register } = require("./config/routesPaths");
const addUser = require('../functions/addUser');
const { errorRegister, errorEmptyField, errorPasswordMatch, errorUserAlreadyExists, errorServer } = require("./config/strings");
const userAlreadyExists = require("../functions/userAlreadyExists");


// Page
router.get(register, (req, res) => {
    res.render('register');
});

// Api
router.post(register, async (req, res) => {
    let { email, password, passwordConfirm } = req.body;

    if(!email || !password || !passwordConfirm) {
        return res.render('register', {email, errorMessage: errorEmptyField});
    }

    passwordConfirm = passwordConfirm.trim();
    password = password.trim();

    // Vérifier si les deux mots de passe correspondent
    if(password !== passwordConfirm) {
        return res.render('register', {email, errorMessage: errorPasswordMatch});
    } 

    if(email && password) {

        // Vérifier si un utilisateur n'existe pas déjà dans la base
        const isUserAlreadyExists = await userAlreadyExists(email);
        if(isUserAlreadyExists) {
            return res.render('register', {email, errorMessage: errorUserAlreadyExists});
        }

        // Ajouter un utilisateur à la base de données
        const isAdded = await addUser(email, password);
        if(isAdded) {
            // Rediriger automatiquement sur la page "login" après l'inscription
            return res.redirect('login');
        } else {
            return res.render('register', {email, errorMessage: errorServer});
        }
    } else {
        res.render('register', {errorMessage: errorRegister});
    }
});


module.exports = router;
