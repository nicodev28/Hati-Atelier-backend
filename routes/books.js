const express = require('express');
const { checkToken } = require('../middlewares/jwt');
const router = express.Router();
const bookModel = mongoose.model('book');

router.use(checkToken);

// Récupère tous les éléments.
router.get('/', async (req, res) => {
    try {
        res.json(await bookModel.find({}));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});

// Récupère un élément spécifique par ID.
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await bookModel.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'book not found' });
        }
        res.json(book);
    } catch (error) {

    }
});

// Crée un nouveau élément.
router.post('/', async (req, res) => {
    const body = req.body;

    try {
        const hospital = await bookModel.create(body);

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