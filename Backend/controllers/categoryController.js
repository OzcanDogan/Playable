const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name ve description zorunludur" });
        }
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ message: 'Kategori başarıyla oluşturuldu', category: newCategory });
    } catch (error) {
        console.error('Kategori oluşturma başarısız:', error.message);
        res.status(500).json({ message: 'Kategori oluşturma sırasında bir hata oluştu' });
    }
};
 // get all categories 
 exports.getAllCategories = async (req, res) => {
 try{
    const categories = await Category.find().sort({name: 1});
    res.json(categories);
 }
 catch (error) {
    console.error('Kategorileri getirme başarısız:', error.message);
    res.status(500).json({ message: 'Kategoriler getirme sırasında bir hata oluştu' });
 }
};