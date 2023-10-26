const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postsCtrl");
const { uploadToS3, deleteFromS3 } = require("../config/s3Middlewares");


// router.post("/new/upload", uploadToS3, postsCtrl.uploadImg);
// router.post("/new", postsCtrl.create);

router.get("/:userID", postsCtrl.userPosts);
router.get("/:userID/:postID", postsCtrl.viewPost);
router.post("/:userID/new", postsCtrl.createNewPost);
router.delete("/:postID", postsCtrl.del);

module.exports = router;