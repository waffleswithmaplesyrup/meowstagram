const express = require("express");
const router = express.Router();
const followersCtrl = require("../controllers/followersCtrl");

router.post("/:recipientID/new", followersCtrl.followUser);
router.delete("/:recipientID/:senderID", followersCtrl.unfollowUser);
router.get("/:senderID", followersCtrl.showfollows);

module.exports = router;