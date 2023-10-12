const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('app is connected to mongoDB');
})

const app = express();

require('./models/user');
require('./models/book');

const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');


app.use(express.json());

app.use('/users', usersRouter);
app.use('/books', booksRouter);


app.listen(PORT, () => {
    console.log(`Lancement du server sur le port: ${PORT}`);
});