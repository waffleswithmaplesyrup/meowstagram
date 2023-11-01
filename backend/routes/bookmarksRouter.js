const express = require("express");
const router = express.Router();
const bookmarksCtrl = require("../controllers/bookmarksCtrl");

router.post("/:postID", bookmarksCtrl.bookmarkPost);
router.delete("/:postID/:userID", bookmarksCtrl.removeBookmark);
router.get("/:postID", bookmarksCtrl.showBookmarks);
router.get("/user/:userID", bookmarksCtrl.showUserBookmarks);

module.exports = router;