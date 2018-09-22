const mongoose = require('mongoose');
const express  = require('express');
const router   = express.Router();

const Author = require('../models/Author');

router.get('/', (req,res) => {
    const promise = Author.aggregate([
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: 'author_id',
                as: 'books'
            }
        },
        {
            $unwind: {
                path: '$books',
                preserveNullAndEmptyArrays: true

            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    bio: '$bio'
                },
                books: {
                    $push: '$books'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                bio: '$_id.bio',
                books: '$books'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/', (req, res, next) => {
    const author = new Author(req.body);
    const promise = author.save(

    );

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/:author_id', (req,res) => {
    const promise = Author.findByIdAndUpdate(req.params.author_id, req.body, {new : true});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:author_id', (req,res) => {
    const promise = Author.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.author_id)
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: 'author_id',
                as: 'books'
            }
        },
        {
            $unwind: {
                path: '$books',
                preserveNullAndEmptyArrays: true

            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    bio: '$bio'
                },
                books: {
                    $push: '$books'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                bio: '$_id.bio',
                books: '$books'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
