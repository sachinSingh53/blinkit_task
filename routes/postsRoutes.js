const express = require('express');
const router = express.Router({mergeParams:true});
const postController = require('../controllers/postController');
const {isLoggedIn} = require('../middlewares/authmiddleware');
const multer  = require('multer')
const storage = require('../cloudinary/index');
const upload = multer(storage);
// const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(postController.index)
    .post(isLoggedIn,upload.array('images'),postController.create);

router.route('/:id')
    .get(isLoggedIn,postController.show)
    .put(isLoggedIn,postController.update)
    .delete(isLoggedIn,postController.delete);



module.exports = router;