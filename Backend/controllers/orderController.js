const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        message: "userId ve items zorunludur."
      });
    }

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items,
      totalPrice
    });

    await order.save();

    res.status(201).json({
      message: "Sipariş başarıyla oluşturuldu",
      order
    });
  } catch (err) {
    console.error("Sipariş oluşturma hatası:", err);
    res.status(500).json({
      message: "Sipariş oluşturulamadı",
      error: err.message
    });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId zorunludur" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Siparişler başarıyla getirildi",
      orders,
    });

  } catch (error) {
    console.error("Sipariş sorgu hatası:", error.message);
    res.status(500).json({
      message: "Siparişler alınamadı",
      error: error.message,
    });
  }
};
