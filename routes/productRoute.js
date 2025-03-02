const express = require("express");
const roleMiddleware = require('../middleware/roleMiddleware');
const productController = require("../controllers/productController");
const router = express.Router();


router.route("/cycle").get(productController.getAllProducts);
router.route("/").post(productController.createProduct);




//router.route("/cycle").get(productController.getAllProducts());

module.exports = router;