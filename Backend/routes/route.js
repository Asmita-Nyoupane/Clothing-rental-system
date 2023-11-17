const express = require('express')
const router = express.Router();

const {signupUser,loginUser} = require('../controllers/user')

const {uploadImage, getImage} = require('../controllers/image_controller')
const{ createPost, getAllPosts }= require('../controllers/post_controller')
const upload = require('../middleware/upload')
const authenticateToken = require('../middleware/authenticateToken')

router.get('/hi',(req,res)=>{
res.json({msg:"hello"})
})
router.post('/signup',signupUser);
router.post('/login',loginUser);

router.post('/file/upload',upload.single("file"),uploadImage);
router.get('/file/:filename',getImage)

router.post('/create',authenticateToken,createPost);
router.get('/posts',getAllPosts );


module.exports= router;