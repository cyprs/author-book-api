const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://author-book-api:123qwe@ds161112.mlab.com:61112/author-book-api', {useMongoClient: true});
    mongoose.connection.on('open', ()=>{
       console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err)=>{
       console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};