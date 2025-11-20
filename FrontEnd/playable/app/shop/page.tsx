"use client";
import { getCategories, getNewestProducts } from "@/lib/api";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/stores/productStore";
import { useProductByCategoryStore } from "@/stores/productByCategoryStore";


export default function ShopHomePage() {
 

const [categories, setCategories] = useState<Category[]>([]);
const [newProducts,setNewProducts] = useState<Product[]>([]);
const router = useRouter();
const setSelectedProduct = useProductStore((s) => s.setSelectedProduct);
const setSelectedCategory = useProductByCategoryStore((s)=>s.setSelectedCategory);

useEffect(() => {
  const loadCategories = async () => {
    try {
      const data = await getCategories(); 
      setCategories(data || []);
    } catch (err) {
      console.error("Kategori yüklenirken hata:", err);
      setCategories([]);
    }
  };
    const loadNewestProducts = async ()=>{
    try{
      const data = await getNewestProducts();
      
      setNewProducts(data.newestProducts || [])
      console.log("Products : ", data.newestProducts)
      
    }catch(err){
      console.error("Ürünler alınırken bir sorun çıktı.",err)

    }
  };
  loadCategories();loadNewestProducts();
}, []);
useEffect(()=>{

  
},[])
  return (
    <div className="space-y-10">

      {/* HERO / BANNER */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-10 shadow">
        <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz 👋</h1>
        <p className="text-lg">
          Playable Shop ile en trend ürünleri keşfedin. Uygun fiyatlar, hızlı teslimat!
        </p>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Kategoriler</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {/* Placeholder örnek kategoriler */}
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer text-center"
             onClick={() => {
      setSelectedCategory(cat);           // 1) store'a koy
      router.push("/shop/product/productByCategory");  // 2) kategori ürünlerine git
    }}
            >
              <span className="font-semibold">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
   <section>
  <h2 className="text-2xl font-bold mb-4">En Yeni Ürünler</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    
    {newProducts.map((pro) => (
      <div
        key={pro._id}
        className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 cursor-pointer"
        onClick={() => {
          setSelectedProduct(pro);           // Ürünü store'a at
          router.push("shop/product/detail");    // Detay sayfasına git
        }}
      >
        <div className="h-40 bg-gray-100 rounded mb-3" />
        <h3 className="font-semibold">{pro.name}</h3>
        <p className="text-blue-600 font-bold">₺ {pro.price}</p>
        <p className="text-gray-500">Son {pro.stock} ürün</p>
      </div>
    ))}

  </div>
</section>

    </div>
  );
}
