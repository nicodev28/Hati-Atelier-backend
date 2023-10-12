const express = require('express');
const { default: mongoose } = require('mongoose');
const { checkToken } = require('../middlewares/jwt');
const router = express.Router();
const bookModel = mongoose.model('Book');
const userModel = mongoose.model('User');
const logger = require('../tools/logger');

router.use(checkToken);

// Récupère tous les éléments.
router.get('/', async (req, res) => {
    const role = await userModel.findOne({ role });
    if (role || !role) {
        try {
            res.json(await bookModel.find({}));
        } catch (error) {
            logger.log('error','the server encountered a problem');
            res.status(500).json({ message: error.message });
        }
    } else {
        logger.log('error','the server encountered a problem');
        return res.status(500).json({ message: 'the server encountered a problem' });
    }
});

// Récupère un élément spécifique par ID.
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const role = await userModel.findOne({ role });
    if (role || !role) {
        try {
            const book = await bookModel.findById(id);
    
            if (!book) {
                logger.log('error',`The book ${book} not found`);
                return res.status(404).json({ message: 'book not found' });
            }
            res.json(book);
        } catch (error) {
    
        }
    } else {
        logger.log('error',`the server encountered a problem`);
        return res.status(500).json({ message: 'the server encountered a problem' });
    }
});

// Crée un nouveau élément.
router.post('/', async (req, res) => {
    const body = req.body;
    const role = await userModel.findOne({ role });
    if (!role) {
        logger.warn('you are not an administrator')
        return res.status(401).json({ message: 'Authentication is required to access the resource'})
    }
    try {
        const book = await bookModel.create(body);

        res.json(book);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'book not created' });
    }
});

// Supprime un élément spécifique par ID.
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const role = await userModel.findOne({ role });
    if (!role) {
        logger.warn('you are not an administrator')
        return res.status(401).json({ message: 'Authentication is required to access the resource'})
    }
    try {
        const book = await bookModel.findByIdAndDelete(id);

        if(!book) {
            return res.status(404).json({ error: 'book not found' });
        }
        res.json({
            "message": "deleted"
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: 'book not deleted' });
    }
});

module.exports = router;