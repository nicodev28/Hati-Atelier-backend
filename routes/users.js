const express = require('express');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { getToken, checkToken } = require('../middlewares/jwt');
const logger = require('../tools/logger');

const router = express.Router();
const UserModel = mongoose.model('User');

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
        logger.log('error', 'user creation error')
        res.json('user creation error');
    }
});

// Connexion d'un utilisateur
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if(!user) {
        logger.log('error', 'Username or Password does not match');
        res.status(401).json('Username or Password does not match');
    } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            logger.log('error', 'Username or Password does not match');
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