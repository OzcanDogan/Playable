const router = require("express").Router();
const { createProduct, getProducts, getProductById, updateProduct,getProductsByCategory, getAllProducts,getNewestProducts } = require("../controllers/productController");

router.post("/create-product", createProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-product/:id", getProductById);
router.get("/get-newest-products", getNewestProducts);
router.get("/get-products-by-category/:categoryId", getProductsByCategory);

module.exports = router;