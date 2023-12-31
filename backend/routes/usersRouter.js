const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");
const { deleteProfilePicFromS3, uploadToS3 } = require("../config/s3Middlewares");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/:id", usersCtrl.del);
router.get("/readAll", usersCtrl.readAll);
router.get("/:id", usersCtrl.getOne);

router.patch("/:id/updateBio", usersCtrl.updateUserBio);
router.post("/new/upload", uploadToS3, usersCtrl.uploadImg);
router.patch("/:id/updatePic", deleteProfilePicFromS3, usersCtrl.updateUserPic);

router.get("/readAll/admin", usersCtrl.readAllAdmin);
router.patch("/deactivate/admin/:userID", usersCtrl.deactivateUser);

router.get("/search/:keyword", usersCtrl.searchUser);

module.exports = router;