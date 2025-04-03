const express = require('express');
const userController = require('../controllers/userController');
const registerMiddleware = require('../middleware/registerMiddleware');
const loginMiddleware = require('../middleware/loginMiddleware');
const router = express.Router();


router.route("/login").post(loginMiddleware,userController.loginUser);
router.route("/signup").post(registerMiddleware,userController.registerUser);
router.route("/logout").get(userController.logoutUser);
router.route("/:id").delete(userController.deleteUser);

router.route("/shopping").get(userController.getBasket);
router.route("/shopping/:id").get(userController.addToBasket);
router.route("/shopping/:id").delete(userController.deleteBasket);

router.route("/shopping/decrease/:id").delete(userController.decreaseBasket);

module.exports = router;