const {
    AddNewPost,GetPosts,
    GetSinglePost,UpdatePost,
    DeletePost
}	= require('../../../controllers/news/news.post.controller');
const newsRouter = require('express').Router();


newsRouter.post('/uploadPost',AddNewPost);

newsRouter.patch('/news/post:id',UpdatePost);
newsRouter.delete('/news/post:id',DeletePost);

module.exports = newsRouter;
