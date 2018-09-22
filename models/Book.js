const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema ({
    author_id: Schema.Types.ObjectId,
    title:{
       type: String,
       required: true,
       maxlength: 150,
       minlength: 1
    },
    category:{
       type: String,
       required: true,
       maxlength: 50,
       minlength: 1
    },
    year:{
       type: Number,
       required: true
    },
    lang:{
       type: String,
       required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);