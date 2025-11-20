export interface ProductPayload {
 name: string;
  description: string;
  price: number;
  category: string; 
  stock: number;
  images: string[];
}
export interface Product{
  name:string;
  description: string;
  _id:string;
  price: number;
  stock:number;
  images:string[];
  category:string;
}