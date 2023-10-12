const express = require('express');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { getToken, checkToken } = require('../middlewares/jwt');

const router = express.Router();
const UserModel = mongoose.model('user');

// création d'un nouvel utilisateur
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    let hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        username,
        password: hashPassword
    });

    if(user) {
        res.json(user);
    } else {
        res.json('error');
    }
});

// Connexion d'un utilisateur
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if(!user) {
        res.status(401).json('Username or Password does not match')
    } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            res.status(401).json('Username or Password does not match');
        } else {
            const token = getToken(user);
            res.json({
                token
            });
        }
    }
});


module.exports = router;