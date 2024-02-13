const Post = require('../model/posts');
const cloudinary = require('cloudinary');


module.exports.index = async(req,res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).json({
            posts: posts
        })
        
    }catch(err){
        res.status(400).json({
            error: err.message
        })

    }
}

module.exports.show = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            post:post
        })
    }catch(err){
        res.status(400).json({
            error: err.message
        })
        
    }
}

module.exports.create = async(req,res)=>{
    try{
        
        const post = await new Post;
        post.title = req.body.title;
        
        post.images = req.files.map(f=>({url: f.path, filename: f.filename}));
        post.save();

        res.status(200).json({
            message: 'successfully created the post'
        })
    }catch(err){
        res.status(400).json({
            error: err.message
        })

    }
}

module.exports.update = async(req,res)=>{
    try{
        await Post.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            message:"successfully updated the post",

        })
    }catch(err){
        res.status(400).json({
            error: err.message
        })

    }
}

module.exports.delete = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        for (let itr of post.images) {
            await cloudinary.uploader.destroy (itr.filename);
         //    console.log(filename);
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"deleted Successfully",
        })
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}

