const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likesCtrl");

router.post("/:postID", likesCtrl.likePost);
router.delete("/:postID/:senderID", likesCtrl.unlikePost);
router.get("/:postID", likesCtrl.showLikes);

module.exports = router;