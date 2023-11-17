const Post = require("../models/Post");

const createPost = async (req,res)=>{
    try {
        const post = await new Post(req.body);
        post.save();
        return res.status(200).json({msg:"Post saved successfully"})
    } catch (error) {
        return res.status(500).json({msg:error})
    }

}


const getAllPosts = async (req,res )=>{
    try {
        let posts = await  Post.find({});
        return res.status(200).json(posts);
        
    } catch (error) {
       return  res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = {createPost, getAllPosts};