const express = require("express");
const router = express.Router();
const followersCtrl = require("../controllers/followersCtrl");

router.post("/:username/new", followersCtrl.followUser);
router.delete("/:username/:senderID", followersCtrl.unfollowUser);
router.get("/:username", followersCtrl.showfollows);

module.exports = router;