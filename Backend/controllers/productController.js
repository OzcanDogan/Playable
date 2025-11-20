const Product = require('../models/Product');


// Ürün oluşturma
exports.createProduct = async (req, res) => {
  try{
        const { name, description, price, category, stock } = req.body;
        
       if (!name || !price || !category) {
  return res.status(400).json({ message: "Name, price ve category zorunludur" });
}


        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
          
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
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json({ products : products  });
  }
  catch(error) {
    console.error('Ürünleri getirme başarısız:', error.message);
    res.status(500).json({ message: 'Ürünleri getirme sırasında bir hata oluştu' });
  }
};

// Belirli bir ürünü getirme
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json({ product : product  });
  }
  catch(error){
    console.error('Ürünü getirme başarısız:', error.message);
    res.status(500).json({ message: 'Ürünü getirme sırasında bir hata oluştu' });
  }
};
// En yeni eklenen 5 ürünü getirme 
exports.getNewestProducts = async (req, res) => {
  try {
    const newestProducts= await Product.find().sort({createdAt: -1}).limit(5);
    res.json({newestProducts: newestProducts });

  }
  catch(error){
    console.error('Yeni ürünleri getirme başarısız:', error.message);
    res.status(500).json({ message: 'Yeni ürünleri getirme sırasında bir hata oluştu' });
  }
};

// Ürün güncelleme
exports.updateProduct = async (req, res) => {
  try{
    const productId = req.params.productId;
    const updateProduct= req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateProduct, { new: true });
    if(!updatedProduct){
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    } 
    res.json({ message: 'Ürün başarıyla güncellendi', product: updatedProduct  });

  }
  catch (error){
    console.error('Ürün güncelleme başarısız:', error.message);
    res.status(500).json({ message: 'Ürün güncelleme sırasında bir hata oluştu' });
  }
};
// Kategoriye göre ürün getirme
exports.getProductsByCategory= async (req, res) => {
try {
  const categoryId = req.params.categoryId;
  const products= await Product.find({category: categoryId});
  res.json({ products: products  });
}
catch(error){
  console.error("Kategoriye göre ürün getirme başarısız:", error.message);
  res.status(500).json({ message: "Kategoriye göre ürün getirme sırasında bir hata oluştu" });

}};



