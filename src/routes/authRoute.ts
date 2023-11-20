const express = require ('express');
const router = express.Router();
const authController = require ("@src/controllers/AuthController");

router.get("/", authController.login);
router.post("/", authController.authentication);
router.post("/create", authController.createUser);

module.exports=router;