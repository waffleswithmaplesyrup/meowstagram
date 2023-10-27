const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postsCtrl");
const { uploadToS3, deleteFromS3 } = require("../config/s3Middlewares");

router.get("/:username", postsCtrl.userPosts);
router.get("/:username/:postID", postsCtrl.viewPost);
router.post("/new/upload", uploadToS3, postsCtrl.uploadImg);
router.post("/:userID/new", postsCtrl.createNewPost);
router.patch("/:postID/edit", postsCtrl.editCaption);
router.delete("/:postID", deleteFromS3, postsCtrl.del);

module.exports = router;