const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema ({
    author_id: Schema.Types.ObjectId,
    title:{
       type: String,
       required: true
    },
    category: String,
    year: Number,
    lang: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);