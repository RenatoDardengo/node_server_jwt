const express = require ('express');
const router = express.Router();
const authController = require ("@src/controllers/AuthController");
import authenticated from '@src/middleware/authenticated';

router.get("/", authController.login);
router.post("/", authController.authentication);
router.post("/create", authenticated, authController.storeUser);
router.put ("/update/:id", authController.updateUser);

module.exports=router;