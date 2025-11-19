const router = require("express").Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

router.post("/create-product", createProduct);

module.exports = router;