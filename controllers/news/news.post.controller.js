const NewsPost = require('../../models/news/news.post.mongo')

const AddNewPost = async (req, res) => {
    try{
        const post = new NewsPost(...req.body);
        await post.save();
        res.status(200).json({message:'Uploaded successfully'});
    }
    catch(err){
        res.status(500).json({errorMessage: err.message});
    }
}

const GetPosts = async( req , res)=>{
    const page = req.query.page;
    try{

        const results = await NewsPost.find({}).sort({createdAt:1}).skip(page*10).lean();
        res.status(200).json(results);

    }
    catch(err) {
        res.status(500).json({errorMessage:err.message});
    }

}

const GetSinglePost = async (req, res) =>{
    const id = req.params.id;
    try{
        const result = await NewsPost.findOne({_id:id}).lean();
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({errorMessage: err.message});
    }
}

const UpdatePost = async (req, res) => {
    const id = req.params.id;
    try{
        
        await NewsPost.findOneAndUpdate({_id:id}, req.body);
        res.status(200).json({message: `Post: ${id} Updated`});
    }
    catch(err){
        res.status(500).json({errorMessage:`Failed to update post: ${id}`});
    }
}

const DeletePost = async (req,res)=>{
    const id = req.params.id;
    try{
        await NewsPost.findOneAndDelete({_id:id});
        res.status(200).json({message:`Post ${id} deleted successfully`});
    }
    catch(err){
        res.status(500).json({errorMessage:`Can't delete post :${id}`});
    }
}

module.exports = {
    AddNewPost,GetPosts,
    GetSinglePost,UpdatePost,
    DeletePost
}