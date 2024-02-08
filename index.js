require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./routes");

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connectée !")
});

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);
app.set('view engine', 'ejs');
app.listen(PORT, () => {
    console.log(`Serveur en marche sur http://localhost:${PORT} !`);
});



