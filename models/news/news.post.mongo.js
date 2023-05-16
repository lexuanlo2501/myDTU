const mongoose = require('mongoose');
const NewsPost = mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('news_post', NewsPost);