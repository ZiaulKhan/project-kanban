const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authSchema = require("../schemas/auth.schema");
const validate = require("../middlewares/validate");
const router = express.Router();

router.post("/register", validate(authSchema), registerUser);
router.post("/login", loginUser);

module.exports = router;
