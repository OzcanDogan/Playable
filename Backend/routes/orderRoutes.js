const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/create-order", orderController.createOrder);
router.get("/get-user-orders/:userId",orderController.getUserOrders)

module.exports = router;