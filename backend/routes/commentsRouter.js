const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

// router.get("/:username", postsCtrl.userPosts);
// router.get("/:username/:postID", postsCtrl.viewPost);
// router.post("/new/upload", uploadToS3, postsCtrl.uploadImg);
// router.post("/:userID/new", postsCtrl.createNewPost);

router.post("/:postID/new", commentsCtrl.createNewComment);
router.delete("/:commentID", commentsCtrl.deleteComment);
router.get("/:postID", commentsCtrl.getAllComments);

// router.delete("/:postID", deleteFromS3, postsCtrl.del);

module.exports = router;