const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/:id", usersCtrl.deactivate);
router.get("/", usersCtrl.readAll);
router.get("/:id", usersCtrl.getOne);

module.exports = router;
