const express = require ('express');
const router = express.Router();
const authController = require ("@src/controllers/AuthController");
import authenticated from '@src/middleware/authenticated';

router.get("/users", authenticated, authController.getAllUsers);
router.post("/", authController.authentication);
router.post("/create", authenticated, authController.storeUser);
router.put ("/update/:id", authenticated, authController.updateUser);
router.get('/verify-token', authenticated, authController.verifyToken);

module.exports=router;