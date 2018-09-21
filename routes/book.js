const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

router.get('/:book_id', (req,res) => {
    const promise = Book.findById(req.params.book_id);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/', (req, res) => {
    const {title, category, year, lang } = req.body;

    const book = new Book({
        title: title,
        category : category,
        year: year,
        lang: lang,
    });

    const promise = book.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/list', (req, res) => {
    const promise = Book.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
