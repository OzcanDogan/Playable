"use client";

import { useEffect, useState } from "react";
import { createProduct, getCategories } from "@/lib/api";
import { ProductPayload } from "@/types/product";
import { Category } from "@/types/category";




export default function CategoryForm() {
  const [formData, setFormData] = useState<ProductPayload>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    images: []
  });
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {

    const fetchCategories = async () => {
        const cats = await getCategories();
        setCategories(cats);
    };
    fetchCategories();
  }, []);
  const [images,setImages] = useState<File[]>([]);


  const [message, setMessage] = useState("");

  
  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
        ...formData,
        name: e.target.value,  
    });
  };
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
        ...formData,
        description: e.target.value,
    });
    };
    //fiyat
    const handlePriceChange = (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        if(parseFloat(e.target.value) <= 0) return ;
        {
        setFormData({
            ...formData,
            price: parseFloat(e.target.value),
        });
        };
    }
        const handleCategoryChange = (
            e: React.ChangeEvent<HTMLSelectElement>
            ) => {
            setFormData({
                ...formData,
                category: e.target.value,
            });
        };
    //stok
    const handleStockChange = (
        e: React.ChangeEvent<HTMLInputElement>
        ) => {
        if(parseInt(e.target.value) < 0) return ;
        setFormData({
            ...formData,
            stock: parseInt(e.target.value),
        });
        };

    
    
    

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await createProduct(formData);

    if (res.product) {
      setMessage("Product created successfully!");
      setFormData({ name: "", description: "", price: 0, category: "", stock: 0, images: [] });

      
    } 
    else {
      setMessage(res.message || "Failed to create category");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      {message && (
        <p className="mb-4 text-blue-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Product name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChangeName}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChangeDescription}
            required
          ></textarea>
        </div>

        {/* PRICE */}
     <div className="flex-1 row-auto gap-4 flex">
           <div>
          <label  className="block font-semibold mb-1">Price</label>
          <input type="number" onChange={handlePriceChange}
          className="border p-2"
          value={formData.price}
          required
          placeholder="Enter Product Price"

          />
        </div>

        <div >
            <label className="block font-semibold mb-1">Stock</label>
            <input type="number" onChange={handleStockChange}
            className="border p-2"
            value={formData.stock}
            required
            placeholder="Enter Product Stock"
            />
        </div>
     </div>
     <div>
        {/* CATEGORY */}
        <label className="block font-semibold mb-1">Category</label>
        <select onChange={handleCategoryChange}
        className="w-full border p-2 rounded"
        value={formData.category}
        required
        
        >
            <option value="">Select a category</option>

  {categories.map((cat:Category) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}

             </select>
     </div>
<div>
    <label className="block font-semibold">Images</label>
    
</div>
     


        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold p-2 rounded hover:bg-blue-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
