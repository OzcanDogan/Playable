// app/admin/products/[id]/page.tsx

import { getProductById } from "@/lib/api";
import { Product } from "@/types/product";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
 

  const { id } = await params;

  const data = await getProductById(id);
  const product: Product = data.product;

  if (!product) {
    return <div className="p-6 text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Product Detail</h1>

      <div className="space-y-3">
        <div>
          <span className="font-bold">ID: </span>
          {product._id}
        </div>
        <div>
          <span className="font-bold">Name: </span>
          {product.name}
        </div>
        <div>
          <span className="font-bold">Description: </span>
          {product.description}
        </div>
        <div>
          <span className="font-bold">Price: </span>
          {product.price}
        </div>
        <div>
          <span className="font-bold">Category: </span>
          {product.category}
        </div>
        <div>
          <span className="font-bold">Stock: </span>
          {product.stock}
        </div>
      </div>
    </div>
  );
}
