// appel des fonctionnalités Express, mongo, env, logger
const express= require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('./tools/logger');
require('dotenv').config();
const PORT = 3000;

//connexion au serveur mogo et log à la connexion
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    logger.log('Info', 'application is connected to mongoDB');
});

// chargement des fichiers models mongo
require('./models/User');
require('./models/Book');


// liaison des routes par defaut Users et books correspondant au fichier routes concerné
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
app.use(express.json());
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// Configuration lancement server
app.listen(PORT, () => {
    logger.log('info', `Run server on port: ${PORT}`);
});