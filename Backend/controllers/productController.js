const Product = require('../models/Product');


// Ürün oluşturma
exports.createProduct = async (req, res) => {
  try{
        const { name, description, price, category, stock,images } = req.body;
        
       if (!name || !price || !category) {
  return res.status(400).json({ message: "Name, price ve category zorunludur" });
}


        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });
        await product.save();
        res.status(201).json({ message: 'Ürün başarıyla oluşturuldu', product  });
  }
  catch (error){
    console.error('Ürün oluşturma başarısız:', error.message);
    res.status(500).json({ message: 'Ürün oluşturma sırasında bir hata oluştu' });
  }

};

// Tüm ürünleri listeleme
exports.getAllProducts = async (req, res) => {};

// Belirli bir ürünü getirme
exports.getProductById = async (req, res) => {};

// Ürün güncelleme
exports.updateProduct = async (req, res) => {};

// Ürün silme
exports.deleteProduct = async (req, res) => {};

// Featured Products
exports.getNewestProducts = async (req, res) => {};

