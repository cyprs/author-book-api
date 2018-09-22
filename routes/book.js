const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

router.get('/', (req, res) => {
    const promise = Book.aggregate([
        {
            $lookup: {
                from: 'authors',
                localField: 'author_id',
                foreignField: '_id',
                as: 'authors'
            }
        },
        {
            $unwind: '$authors'
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/news', (req, res) => {
    const promise = Book.find({}).limit(5).sort({ year: -1});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:book_id', (req,res) => {
    const promise = Book.findById(req.params.book_id);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/', (req, res) => {
    const {author_id, title, category, year, lang } = req.body;

    const book = new Book({
        author_id: author_id,
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

router.put('/:book_id', (req,res) => {
    const promise = Book.findByIdAndUpdate(req.params.book_id, req.body, {new : true});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete('/:book_id', (req,res) => {
    const promise = Book.findByIdAndRemove(req.params.book_id);

    promise.then((data) => {
        res.json({status : true});
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/search/:start_year/:end_year', (req, res) => {

    const {start_year, end_year} = req.params;
    const promise = Book.find({
        year: {"$gte" : parseInt(start_year), "$lte": parseInt(end_year)}
    });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
