const router = require("express").Router();
const {createCategory,getAllCategories} = require("../controllers/categoryController");

router.post("/create-category", createCategory);
router.get("/get-all-categories", getAllCategories);


module.exports = router;