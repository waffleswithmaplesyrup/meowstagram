const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

router.post("/:postID/new", commentsCtrl.createNewComment);
router.delete("/:commentID", commentsCtrl.deleteComment);
router.get("/:postID", commentsCtrl.getAllComments);

module.exports = router;