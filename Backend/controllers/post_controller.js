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
module.exports =createPost;