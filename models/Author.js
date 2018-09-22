const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema ({
    name:{
      type: String,
      required: true,
      maxlength: 60,
      minlength: 2
    },
    bio:{
      type: String,
      required: true,
      maxlength: 1000,
      minlength: 2
    }
});

module.exports = mongoose.model('Author', AuthorSchema);